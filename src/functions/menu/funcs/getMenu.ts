import { Bson } from "../../../../db.ts";
import { menus, Menu, RMenu } from "../../../schemas/menu.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetMenuInput = { _id: Bson.ObjectID; get: RMenu };
type GetMenuFn = ({ _id, get }: GetMenuInput) => Promise<Menu>;
export const getMenu: GetMenuFn = async ({ _id, get }) => {
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
  const foundedMenu = await menus.findOne({ _id }, { projection });
  const doRelation = async (menu: Menu, get: RMenu) => {
    return menu;
  };
  return foundedMenu
    ? await doRelation(foundedMenu, get)
    : throwError("can not find center");
};
