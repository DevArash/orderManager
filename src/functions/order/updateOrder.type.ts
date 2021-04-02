import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import {
  OrderStatus,
  OrderType,
  ROrder,
  orderSelectable,
  Rating,
} from "../../schemas/mod.ts";

const v = new FastestValidator();

/**
 * this is validator for update order
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateOrder = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        strict: true,
        props: {
          /**
           * The Values of the order that is going to be updated
           */
          _id: { type: "string", optional: true },
          orderStatus: {
            type: "string",
            optional: true,
            values: ["InPreparation", "Delivered", "Canceled"],
          },
          totalPrice: { type: "number", optional: true },
          orderType: {
            type: "enum",
            optional: true,
            values: ["Table", "Takeout"],
          },
          preprationTime: { type: "date", optional: true },
          customerPhoneNumber: { type: "number", optional: true },
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

/**
 * Represent Input details
 * this is input of updating order
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateOrderDetails {
  set: {
    //this is the _id of the Order that we want to update
    _id: string;
    //these fields are the fields that can be modified
    orderStatus: OrderStatus;
    totalPrice: number;
    orderType: OrderType;
    preprationTime?: Date;
    customerPhoneNumber: number;
  };
  get: ROrder;
}
