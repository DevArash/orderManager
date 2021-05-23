import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { OrderStatus, ROrder, orderSelectable } from "../../schemas/mod.ts";

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
    id: string;
    //these fields are the fields that can be modified
    orderStatus: OrderStatus;
  };
  get: ROrder;
}
