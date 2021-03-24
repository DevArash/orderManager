import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { parishes, countries, states } from "./../../schemas/mod.ts";
import { getParish } from "./sharedFuncs/mod.ts";
import { checkUpdateParish, UpdateParishDetails } from "./updateParish.type.ts";

type UpdateParish = (details: UpdateParishDetails, context?: Context) => any;

/**
 * Represent updateParish (update Parish on db)
 * @function
 * @param details
 * @param context
 */
export const updateParish: UpdateParish = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateParish({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, geometries },
    get,
  } = details;

  await parishes.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, geometries } }
  );

  const foundNewParish = await parishes.findOne({
    _id: new Bson.ObjectID(_id),
  });

  //2 update Parish in Country And State collection
  await countries.updateMany(
    { "parish._id": new Bson.ObjectID(_id) },
    { $set: { parish: foundNewParish } }
  );
  await states.updateMany(
    { "parish._id": new Bson.ObjectID(_id) },
    { $set: { parish: foundNewParish } }
  );

  return get ? getParish({ _id: foundNewParish!._id, get }) : foundNewParish;
};
