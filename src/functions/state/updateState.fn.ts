import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { states, countries, cities } from "./../../schemas/mod.ts";
import { getState } from "./sharedFuncs/mod.ts";
import { checkUpdateState, UpdateStateDetails } from "./updateState.type.ts";

type UpdateState = (details: UpdateStateDetails, context?: Context) => any;

/**
 * Represent updateState (update State on db)
 * @function
 * @param details
 * @param context
 */
export const updateState: UpdateState = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateState({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, logo, geometries },
    get,
  } = details;

  await states.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, logo, geometries } }
  );

  const foundNewState = await states.findOne({
    _id: new Bson.ObjectID(_id),
  });

  //2 update State in Menu And Table collection
  await countries.updateMany(
    { "state._id": new Bson.ObjectID(_id) },
    { $set: { state: foundNewState } }
  );
  await cities.updateMany(
    { "state._id": new Bson.ObjectID(_id) },
    { $set: { state: foundNewState } }
  );

  return get ? getState({ _id: foundNewState!._id, get }) : foundNewState;
};
