import { getMenu } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { menus } from "./../../schemas/mod.ts";
import { checkDeleteMenu, DeleteMenuDetails } from "./deleteMenu.type.ts";

type DeleteMenu = (details: DeleteMenuDetails, context?: Context) => any;

const deleteMenu = async (_id: Bson.ObjectID) => {
  const deletedMenu = await menus.findOne({
    _id,
  });

  //step 1: delete the Menu itself
  await menus.deleteOne({ _id });
  return deletedMenu;
};

/**
 * @function
 * @param details
 * @param context
 */

export const deleteMenuFn: DeleteMenu = async (details, context) => {
  const detailsIsRight = checkDeleteMenu({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteMenu(objId);
};
