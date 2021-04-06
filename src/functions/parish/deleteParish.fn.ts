import { getParish } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { parishes, cities, states, countries } from "./../../schemas/mod.ts";
import { checkDeleteParish, DeleteParishDetails } from "./deleteParish.type.ts";

type DeleteParish = (details: DeleteParishDetails, context?: Context) => any;

const deleteParish = async (_id: Bson.ObjectID) => {
  const deletedParish = await parishes.findOne({
    _id,
  });
  // step1: delete the city and all state, country of this Parish,
  const a = await cities.deleteMany({
    "parish._id": deletedParish!._id,
  });
  const b = await states.deleteMany({
    "parish._id": deletedParish!._id,
  });
  const c = await countries.deleteMany({
    "parish._id": deletedParish!._id,
  });
  //step 2: delete the Parish itself
  await parishes.deleteOne({ _id });
  return deletedParish;
};

/**
 * @function
 * @param details
 * @param context
 */
export const deleteParishFn: DeleteParish = async (details, context) => {
  const detailsIsRight = checkDeleteParish({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteParish(objId);
};
