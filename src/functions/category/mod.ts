import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Category } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingCategory } from "./adding.ts";
import { deleteCategoryFn } from "./deleteCategory.fn.ts";
import { updateCategory } from "./updateCategory.fn.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type CategoryDoit = "Add" | "Delete" | "Update";

type CategoryFns = (
  doit: CategoryDoit,
  details: any
) => Promise<Partial<Category>>;

export const categoryFns: CategoryFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingCategory(details),
        ["Delete"]: async () => await deleteCategoryFn(details),
        ["Update"]: async () => await updateCategory(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
