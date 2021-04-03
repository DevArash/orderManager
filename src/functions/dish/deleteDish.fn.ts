import { getDish } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { dishes } from "./../../schemas/mod.ts";
import { checkDeleteDish, DeleteDishDetails } from "./deleteDish.type.ts";

const deleteDish = async (_id: string) => {
  const deletedDish = await dishes.findOne({
    _id: new Bson.ObjectID(_id),
  });
  //step 1: delete the Dish itself
  await dishes.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedDish;
};

type DeleteDish = (details: DeleteDishDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
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
  return details.get
    ? getDish({ _id: objId, get: details.get })
    : deleteDish(_id);
};