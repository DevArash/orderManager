import { addingState } from "./adding.ts";
import { State } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { updateState } from "./updateState.fn.ts";
import { deleteStateFn } from "./deleteState.fn.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type StateDoit = "Add" | "Delete" | "Update";

type StateFns = (doit: StateDoit, details: any) => Promise<Partial<State>>;

export const stateFns: StateFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingState(details),
        ["Delete"]: async () => await deleteStateFn(details),
        ["Update"]: async () => await updateState(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
