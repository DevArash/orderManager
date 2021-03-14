import { addingState } from "./adding.ts";
import { State } from "../../schemas/state.ts";
import { throwError } from "../../utils/throwError.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type StateDoit = "Adding";

type StateFns = (doit: StateDoit, details: any) => Promise<Partial<State>>;

export const stateFns: StateFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingState(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
