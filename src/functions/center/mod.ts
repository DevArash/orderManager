import { Center } from "../../schemas/center.ts";
import { throwError } from "../../utils/throwError.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["adding"],
  },
});

export type CenterDoit = "adding";

type CenFns = (doit: CenterDoit, details: any) => Promise<Partial<Center>>;

export const cenFns: CenFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["adding"]: async () => await adding(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
