import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Table } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingTable } from "./adding.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type TableDoit = "Adding";

type TableFns = (doit: TableDoit, details: any) => Promise<Partial<Table>>;

export const tableFns: TableFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingTable(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
