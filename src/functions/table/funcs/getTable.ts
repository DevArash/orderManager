import { Bson } from "../../../../db.ts";
import { tables, Table, RTable } from "../../../schemas/table.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getCenters } from "../../center/funcs/getCenters.ts";

type GetTableInput = { _id: Bson.ObjectID; get: RTable };
type GetTableFn = ({ _id, get }: GetTableInput) => Promise<Table>;
export const getTable: GetTableFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["center"]);
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
  const foundedCenter = await tables.findOne({ _id }, { projection });
  const doRelation = async (table: Table, get: RTable) => {
    if (get.centers)
      tables.center = await getCenters({
        filter: { table: table._id },
        getObj: get.centers,
      });
    return table;
  };
  return foundedCenter
    ? await doRelation(foundedCenter, get)
    : throwError("can not find table");
};
