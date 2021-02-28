import { Bson } from "../../../../db.ts";
import { tables, Table, RTable } from "../../../schemas/table.ts";
import { makeLookUp } from "../../../utils/makeLookUp.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getCenters } from "../../center/funcs/getCenters.ts";

type GetTablesInput = { filter: Bson.Document; getObj: RTable };
type GetTablesFn = ({ filter, getObj }: GetTablesInput) => Promise<Table[]>;
export const getTables: GetTablesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["centers"]);
  const foundedTables = await tables.find(filter, { projection });
  let returnTables = await foundedTables.toArray();
  if (getObj.centers)
    returnTables = await makeLookUp(
      returnTables,
      getCenters,
      "centers",
      getObj.centers
    );
  return returnTables;
};
