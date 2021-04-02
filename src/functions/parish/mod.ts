import { addingParish } from "./adding.ts";
import { Parish } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { updateParish } from "./updateParish.fn.ts";
import { deleteParishFn } from "./deleteParish.fn.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type ParishDoit = "Add" | "Delete" | "Update";

type ParishFns = (doit: ParishDoit, details: any) => Promise<Partial<Parish>>;

export const parishFns: ParishFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingParish(details),
        ["Delete"]: async () => await deleteParishFn(details),
        ["Update"]: async () => await updateParish(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
