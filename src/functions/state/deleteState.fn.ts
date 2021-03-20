import { getState } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { states, cities, countries } from "./../../schemas/mod.ts";
import { checkDeleteState, DeleteStateDetails } from "./deleteState.type.ts";

const deleteState = async (_id: string) => {
  const deletedState = await states.findOne({
    _id: new Bson.ObjectID(_id),
  });
  // step1: delete the city and all country of this State,
  const a = await cities.deleteMany({
    "state._id": deletedState!._id,
  });
  const b = await countries.deleteMany({
    "state._id": deletedState!._id,
  });
  //step 2: delete the State itself
  await states.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedState;
};

type DeleteState = (details: DeleteStateDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
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
  return details.get
    ? getState({ _id: objId, get: details.get })
    : deleteState(_id);
};
