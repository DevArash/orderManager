import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { menus } from "./../../schemas/mod.ts";
import { getMenu } from "./sharedFuncs/mod.ts";
import { checkUpdateMenu, UpdateMenuDetails } from "./updateMenu.type.ts";

type UpdateMenu = (details: UpdateMenuDetails, context?: Context) => any;

/**
 * Represent updateMenu (update Menu on db)
 * @function
 * @param details
 * @param context
 */
export const updateMenu: UpdateMenu = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateMenu({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, subHeading, icon, description, menuCategory },
    get,
  } = details;

  await menus.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, subHeading, icon, description, menuCategory } }
  );

  const foundNewMenu = await menus.findOne({
    _id: new Bson.ObjectID(_id),
  });

  return get ? getMenu({ _id: foundNewMenu!._id, get }) : foundNewMenu;
};
