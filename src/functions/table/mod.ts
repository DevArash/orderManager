import { addingTable } from "./adding.ts";
import { Table } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { updateTable } from "./updateTable.fn.ts";
import { deleteTableFn } from "./deleteTable.fn.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type TableDoit = "Add" | "Delete" | "Update";

type TableFns = (doit: TableDoit, details: any) => Promise<Partial<Table>>;

export const tableFns: TableFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingTable(details),
        ["Delete"]: async () => await deleteTableFn(details),
        ["Update"]: async () => await updateTable(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
