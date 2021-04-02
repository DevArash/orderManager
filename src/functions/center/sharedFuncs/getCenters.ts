import { Bson } from "../../../../db.ts";
import { centers, Center, RCenter } from "../../../schemas/center.ts";
import { makeLookUp, makeProjections } from "../../../utils/mod.ts";
import { getTables } from "../../table/sharedFuncs/mod.ts";

type GetCentersInput = { filter: Bson.Document; getObj: RCenter };
type GetCentersFn = ({ filter, getObj }: GetCentersInput) => Promise<Center[]>;
export const getCenters: GetCentersFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["tables", "menus"]);
  const foundedCenters = await centers.find(filter, { projection });
  let returnCenters = await foundedCenters.toArray();
  if (getObj.tables)
    returnCenters = await makeLookUp(
      returnCenters,
      getTables,
      "tables",
      getObj.tables
    );
  return returnCenters;
};
