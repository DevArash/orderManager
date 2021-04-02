import FastestValidator from "https://esm.sh/fastest-validator@1";
import { Bson } from "../../../db.ts";
import {
  orders,
  orderSelectable,
  Order,
  ROrder,
  OrderStatus,
  OrderType,
} from "../../schemas/mod.ts";
import { Rating } from "../../schemas/rating.ts";
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
          orderStatus: {
            type: "string",
            values: ["InPreparation", "Delivered", "Canceled"],
          },
          totalPrice: { type: "number" },
          orderType: {
            type: "enum",
            values: ["Table", "Takeout"],
          },
          preprationTime: { type: "date", optional: true },
          customerPhoneNumber: { type: "number" },
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
    orderStatus: OrderStatus;
    totalPrice: number;
    orderType: OrderType;
    preprationTime?: Date;
    customerPhoneNumber: number;
  };
  get: ROrder;
}

type AddingOrder = (details: addingOrderDetails) => Promise<Partial<Order>>;

export const addingOrder: AddingOrder = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: {
      orderStatus,
      totalPrice,
      orderType,
      preprationTime,
      customerPhoneNumber,
    },
    get,
  } = details;
  const createdOrder = await orders.insertOne({
    orderStatus,
    totalPrice,
    orderType,
    preprationTime,
    customerPhoneNumber,
  });
  console.log(createdOrder);
  const ob = new Bson.ObjectID(createdOrder);
  return get ? getOrder({ _id: ob, get }) : { _id: ob };
};
