import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Order } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingOrder } from "./adding.ts";
import { deleteOrderFn } from "./deleteOrder.fn.ts";
import { updateOrder } from "./updateOrder.fn.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type OrderDoit = "Add" | "Delete" | "Update";

type OrderFns = (doit: OrderDoit, details: any) => Promise<Partial<Order>>;

export const orderFns: OrderFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingOrder(details),
        ["Delete"]: async () => await deleteOrderFn(details),
        ["Update"]: async () => await updateOrder(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
