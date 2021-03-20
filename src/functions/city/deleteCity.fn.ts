import { getCity } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { cities, states, countries } from "./../../schemas/mod.ts";
import { checkDeleteCity, DeleteCityDetails } from "./deleteCity.type.ts";

const deleteCity = async (_id: string) => {
  const deletedCity = await cities.findOne({
    _id: new Bson.ObjectID(_id),
  });
  // step1: delete the countries and all states of this City,
  const a = await countries.deleteMany({
    "city._id": deletedCity!._id,
  });
  const b = await states.deleteMany({
    "city._id": deletedCity!._id,
  });
  //step 2: delete the City itself
  await cities.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedCity;
};

type DeleteCity = (details: DeleteCityDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
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
  return details.get
    ? getCity({ _id: objId, get: details.get })
    : deleteCity(_id);
};
