import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Center } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingCenter } from "./adding.ts";
import { deleteCenterFn } from "./deleteCenter.fn.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding", "Delete"],
  },
});

export type CenterDoit = "Adding" | "Delete";

type CenterFns = (doit: CenterDoit, details: any) => Promise<Partial<Center>>;

export const centerFns: CenterFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingCenter(details),
        ["Delete"]: async () => await deleteCenterFn(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
