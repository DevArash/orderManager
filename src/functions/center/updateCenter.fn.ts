import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { centers, menus, tables } from "./../../schemas/mod.ts";
import { getCenter } from "./sharedFuncs/mod.ts";
import { checkUpdateCenter, UpdateCenterDetails } from "./updateCenter.type.ts";

type UpdateCenter = (details: UpdateCenterDetails, context?: Context) => any;

/**
 * Represent updateCenter (update Center on db)
 * @function
 * @param details
 * @param context
 */
export const updateCenter: UpdateCenter = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateCenter({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, phone, certificate, activeHours },
    get,
  } = details;

  await centers.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, phone, certificate, activeHours } }
  );

  const foundNewCenter = await centers.findOne({
    _id: new Bson.ObjectID(_id),
  });

  //2 update Center in Menu And Table collection
  await menus.updateMany(
    { "center._id": new Bson.ObjectID(_id) },
    { $set: { center: foundNewCenter } }
  );
  await tables.updateMany(
    { "center._id": new Bson.ObjectID(_id) },
    { $set: { center: foundNewCenter } }
  );

  return get ? getCenter({ _id: foundNewCenter!._id, get }) : foundNewCenter;
};
