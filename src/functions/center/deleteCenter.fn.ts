import { getCenter } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { centers, menus, tables } from "./../../schemas/mod.ts";
import { checkDeleteCenter, DeleteCenterDetails } from "./deleteCenter.type.ts";

const deleteCenter = async (_id: string) => {
  const deletedCenter = await centers.findOne({
    _id: new Bson.ObjectID(_id),
  });
  // step1: delete the Table and all Menus of this Center,
  const a = await menus.deleteMany({
    "center._id": deletedCenter!._id,
  });
  const b = await tables.deleteMany({
    "center._id": deletedCenter!._id,
  });
  //step 2: delete the Center itself
  await centers.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedCenter;
};

type DeleteCenter = (details: DeleteCenterDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const deleteCenterFn: DeleteCenter = async (details, context) => {
  const detailsIsRight = checkDeleteCenter({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return details.get
    ? getCenter({ _id: objId, get: details.get })
    : deleteCenter(_id);
};
