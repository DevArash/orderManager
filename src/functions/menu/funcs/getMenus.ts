import { Bson } from "../../../../db.ts";
import { menus, Menu, RMenu } from "../../../schemas/menu.ts";
import { makeLookUp } from "../../../utils/makeLookUp.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetMenusInput = { filter: Bson.Document; getObj: RMenu };
type GetMenusFn = ({ filter, getObj }: GetMenusInput) => Promise<Menu[]>;
export const getMenus: GetMenusFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["tables", "menus"]);
  const foundedMenus = await menus.find(filter, { projection });
  let returnMenus = await foundedMenus.toArray();
  return returnMenus;
};
