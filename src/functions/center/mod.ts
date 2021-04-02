import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Center } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingCenter } from "./adding.ts";
import { deleteCenterFn } from "./deleteCenter.fn.ts";
import { updateCenter } from "./updateCenter.fn.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type CenterDoit = "Add" | "Delete" | "Update";

type CenterFns = (doit: CenterDoit, details: any) => Promise<Partial<Center>>;

export const centerFns: CenterFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingCenter(details),
        ["Delete"]: async () => await deleteCenterFn(details),
        ["Update"]: async () => await updateCenter(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
