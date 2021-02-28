import { Bson } from "../../../../db.ts";
import { centers, Center, RCenter } from "../../../schemas/center.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getTables } from "../../table/funcs/getTables.ts";
import { getMenus } from "../../menu/funcs/getMenus.ts";

type GetCenterInput = { _id: Bson.ObjectID; get: RCenter };
type GetCenterFn = ({ _id, get }: GetCenterInput) => Promise<Center>;
export const getCenter: GetCenterFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["menus", "tables"]);
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
  const foundedCenter = await centers.findOne({ _id }, { projection });
  const doRelation = async (center: Center, get: RCenter) => {
    if (get.menus)
      center.menus = await getMenus({
        filter: { center: center._id },
        getObj: get.menus,
      });
    if (get.tables)
      center.tables = await getTables({
        filter: { center: center._id },
        getObj: get.tables,
      });
    return center;
  };
  return foundedCenter
    ? await doRelation(foundedCenter, get)
    : throwError("can not find center");
};
