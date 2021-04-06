import { getCity } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { Context } from "../utils/context.ts";
import { throwError } from "../../utils/mod.ts";
import { cities, states, countries } from "./../../schemas/mod.ts";
import { checkDeleteCity, DeleteCityDetails } from "./deleteCity.type.ts";

type DeleteCity = (details: DeleteCityDetails, context?: Context) => any;

const deleteCity = async (_id: Bson.ObjectID) => {
  const deletedCity = await cities.findOne({
    _id,
  });
  // step1: delete the countries and all states of this City,
  const a = await countries.deleteMany({
    "city._id": deletedCity!._id,
  });
  const b = await states.deleteMany({
    "city._id": deletedCity!._id,
  });
  //step 2: delete the City itself
  await cities.deleteOne({ _id });
  return deletedCity;
};

/**
 * @function
 * @param details
 * @param context
 */
export const deleteCityFn: DeleteCity = async (details, context) => {
  const detailsIsRight = checkDeleteCity({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteCity(objId);
};
