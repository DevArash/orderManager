import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Order } from "../../schemas/order.ts";
import { throwError } from "../../utils/throwError.ts";
import { addingOrder } from "./adding.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type OrderDoit = "Adding";

type OrderFns = (doit: OrderDoit, details: any) => Promise<Partial<Order>>;

export const orderFns: OrderFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingOrder(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
