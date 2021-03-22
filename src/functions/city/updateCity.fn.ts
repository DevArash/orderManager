import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { cities, states, countries } from "./../../schemas/mod.ts";
import { getCity } from "./sharedFuncs/mod.ts";
import { checkUpdateCity, UpdateCityDetails } from "./updateCity.type.ts";

type UpdateCity = (details: UpdateCityDetails, context?: Context) => any;

/**
 * Represent updateCity (update City on db)
 * @function
 * @param details
 * @param context
 */
export const updateCity: UpdateCity = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateCity({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, geometries },
    get,
  } = details;

  await cities.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, geometries } }
  );

  const foundNewCity = await cities.findOne({
    _id: new Bson.ObjectID(_id),
  });

  //2 update City in Menu And Table collection
  await countries.updateMany(
    { "city._id": new Bson.ObjectID(_id) },
    { $set: { city: foundNewCity } }
  );
  await states.updateMany(
    { "city._id": new Bson.ObjectID(_id) },
    { $set: { city: foundNewCity } }
  );

  return get ? getCity({ _id: foundNewCity!._id, get }) : foundNewCity;
};
