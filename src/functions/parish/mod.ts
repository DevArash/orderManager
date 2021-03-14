import { addingParish } from "./adding.ts";
import { Parish } from "../../schemas/parish.ts";
import { throwError } from "../../utils/throwError.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type ParishDoit = "Adding";

type ParishFns = (doit: ParishDoit, details: any) => Promise<Partial<Parish>>;

export const parishFns: ParishFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingParish(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
