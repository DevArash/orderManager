import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Center } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingCenter } from "./adding.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type CenterDoit = "Adding";

type CenterFns = (doit: CenterDoit, details: any) => Promise<Partial<Center>>;

export const centerFns: CenterFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingCenter(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
