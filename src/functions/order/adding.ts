import FastestValidator from "https://esm.sh/fastest-validator@1";
import { Bson } from "../../../db.ts";
import {
  orders,
  orderSelectable,
  Order,
  ROrder,
  OrderStatus,
  OrderType,
} from "../../schemas/order.ts";
import { Rating } from "../../schemas/rating.ts";
import { throwError } from "../../utils/throwError.ts";
import { getOrder } from "./funcs/getOrder.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          orderRating: {
            type: "object",
            props: {
              rateNumber: {
                type: "enum",
                values: ["One", "Tow", "Three", "Four", "Five"],
              },
              rateDescription: { type: "string" },
            },
          },
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
    orderRating: Rating;
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
      orderRating,
      orderStatus,
      totalPrice,
      orderType,
      preprationTime,
      customerPhoneNumber,
    },
    get,
  } = details;
  const createdOrder = await orders.insertOne({
    orderRating,
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
