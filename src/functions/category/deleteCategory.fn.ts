import { getCategory } from "./sharedFuncs/mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { categories } from "./../../schemas/mod.ts";
import {
  checkDeleteCategory,
  DeleteCategoryDetails,
} from "./deleteCategory.type.ts";

type DeleteCategory = (
  details: DeleteCategoryDetails,
  context?: Context
) => any;

const deleteCategory = async (_id: Bson.ObjectID) => {
  const deletedCategory = await categories.findOne({
    _id,
  });

  //step 1: delete the Category itself
  await categories.deleteOne({ _id });
  return deletedCategory;
};

/**
 * @function
 * @param details
 * @param context
 */

export const deleteCategoryFn: DeleteCategory = async (details, context) => {
  const detailsIsRight = checkDeleteCategory({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteCategory(objId);
};
