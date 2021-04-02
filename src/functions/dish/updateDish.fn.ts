import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { dishes } from "./../../schemas/mod.ts";
import { getDish } from "./sharedFuncs/mod.ts";
import { checkUpdateDish, UpdateDishDetails } from "./updateDish.type.ts";

type UpdateDish = (details: UpdateDishDetails, context?: Context) => any;

/**
 * Represent updateDish (update Dish on db)
 * @function
 * @param details
 * @param context
 */
export const updateDish: UpdateDish = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateDish({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, price, discount, recipe, photos, calorie },
    get,
  } = details;

  await dishes.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, price, discount, recipe, photos, calorie } }
  );

  const foundNewDish = await dishes.findOne({
    _id: new Bson.ObjectID(_id),
  });

  return get ? getDish({ _id: foundNewDish!._id, get }) : foundNewDish;
};
