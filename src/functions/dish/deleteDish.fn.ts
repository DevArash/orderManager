import { getDish } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { Context } from "../utils/context.ts";
import { throwError } from "../../utils/mod.ts";
import { dishes } from "./../../schemas/mod.ts";
import { checkDeleteDish, DeleteDishDetails } from "./deleteDish.type.ts";

type DeleteDish = (details: DeleteDishDetails, context?: Context) => any;

const deleteDish = async (_id: Bson.ObjectID) => {
  const deletedDish = await dishes.findOne({
    _id,
  });

  //step 1: delete the Dish itself
  await dishes.deleteOne({ _id });
  return deletedDish;
};

/**
 * @function
 * @param details
 * @param context
 */

export const deleteDishFn: DeleteDish = async (details, context) => {
  const detailsIsRight = checkDeleteDish({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteDish(objId);
};
