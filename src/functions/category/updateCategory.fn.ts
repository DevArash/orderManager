import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { categories } from "./../../schemas/mod.ts";
import { getCategory } from "./sharedFuncs/mod.ts";
import {
  checkUpdateCategory,
  UpdateCategoryDetails,
} from "./updateCategory.type.ts";

type UpdateCategory = (
  details: UpdateCategoryDetails,
  context?: Context
) => any;

/**
 * Represent updateCategory (update Category on db)
 * @function
 * @param details
 * @param context
 */
export const updateCategory: UpdateCategory = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateCategory({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, image, description },
    get,
  } = details;

  await categories.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, image, description } }
  );

  const foundNewCategory = await categories.findOne({
    _id: new Bson.ObjectID(_id),
  });

  return get
    ? getCategory({ _id: foundNewCategory!._id, get })
    : foundNewCategory;
};
