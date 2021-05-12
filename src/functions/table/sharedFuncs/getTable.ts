import { Bson } from "../../../../db.ts";
import { throwError } from "../../../utils/mod.ts";
import { tables, Table, RTable } from "../../../schemas/table.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetTableInput = { _id: Bson.ObjectID; get: RTable };
type GetTableFn = ({ _id, get }: GetTableInput) => Promise<Table>;
export const getTable: GetTableFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["centers"]);
  console.log("                      ");
  console.log("++++++++++++++++++++++");
  console.log("                      ");
  console.group("projection => : ");
  console.log("                      ");
  console.log(projection);
  console.log("                      ");
  console.groupEnd();
  console.log("                      ");
  console.log("----------------------");
  console.log("                      ");
  const foundedTable = await tables.findOne({ _id }, { projection });
  const doRelation = async (table: Table, get: RTable) => {
    return table;
  };
  return foundedTable
    ? await doRelation(foundedTable, get)
    : throwError("can not find table");
};
