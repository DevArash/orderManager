import FastestValidator from "https://esm.sh/fastest-validator@1";
import { Bson } from "../../../db.ts";
import {
  orders,
  orderSelectable,
  Order,
  ROrder,
  OrderStatus,
} from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { getOrder } from "../mod.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          id: { type: "string" },
          orderStatus: {
            type: "object",
            props: {
              orderLable: {
                type: "enum",
                values: [
                  "InPreparation",
                  "Delivered",
                  "Canceled",
                  "SeenByOprator",
                  "SeenByChef",
                ],
              },
              time: "date",
            },
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: orderSelectable(1),
      },
    },
  },
});

interface addingOrderDetails {
  set: {
    id: string;
    orderStatus: OrderStatus;
  };
  get: ROrder;
}

type AddingOrder = (details: addingOrderDetails) => Promise<Partial<Order>>;

export const addingOrder: AddingOrder = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { id, orderStatus },
    get,
  } = details;
  const createdOrder = await orders.insertOne({
    id,
    orderStatus,
  });
  console.log(createdOrder);
  const ob = new Bson.ObjectID(createdOrder);
  return get ? getOrder({ _id: ob, get }) : { _id: ob };
};
