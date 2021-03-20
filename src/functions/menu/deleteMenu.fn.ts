import { getMenu } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { menus } from "./../../schemas/mod.ts";
import { checkDeleteMenu, DeleteMenuDetails } from "./deleteMenu.type.ts";

const deleteMenu = async (_id: string) => {
  const deletedMenu = await menus.findOne({
    _id: new Bson.ObjectID(_id),
  });

  //step 1: delete the Menu itself
  await menus.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedMenu;
};

type DeleteMenu = (details: DeleteMenuDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
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
  return details.get
    ? getMenu({ _id: objId, get: details.get })
    : deleteMenu(_id);
};
