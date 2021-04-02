import { addingDish } from "./adding.ts";
import { Dish } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { updateDish } from "./updateDish.fn.ts";
import { deleteDishFn } from "./deleteDish.fn.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type DishDoit = "Add" | "Delete" | "Update";

type DishFns = (doit: DishDoit, details: any) => Promise<Partial<Dish>>;

export const dishFns: DishFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingDish(details),
        ["Delete"]: async () => await deleteDishFn(details),
        ["Update"]: async () => await updateDish(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
