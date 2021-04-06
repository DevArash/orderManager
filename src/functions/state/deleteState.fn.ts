import { getState } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { states, cities, countries } from "./../../schemas/mod.ts";
import { checkDeleteState, DeleteStateDetails } from "./deleteState.type.ts";

type DeleteState = (details: DeleteStateDetails, context?: Context) => any;

const deleteState = async (_id: Bson.ObjectID) => {
  const deletedState = await states.findOne({
    _id,
  });
  // step1: delete the city and all country of this State,
  const a = await cities.deleteMany({
    "state._id": deletedState!._id,
  });
  const b = await countries.deleteMany({
    "state._id": deletedState!._id,
  });
  //step 2: delete the State itself
  await states.deleteOne({ _id });
  return deletedState;
};

/**
 * @function
 * @param details
 * @param context
 */
export const deleteStateFn: DeleteState = async (details, context) => {
  const detailsIsRight = checkDeleteState({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteState(objId);
};
