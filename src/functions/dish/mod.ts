import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Dish } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingDish } from "./adding.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type DishDoit = "Adding";

type DishFns = (doit: DishDoit, details: any) => Promise<Partial<Dish>>;

export const dishFns: DishFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingDish(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
