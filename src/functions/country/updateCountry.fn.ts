import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/throwError.ts";
import { Context } from "../utils/context.ts";
import { countries, states, cities } from "./../../schemas/mod.ts";
import { getCountry } from "./sharedFuncs/mod.ts";
import {
  checkUpdateCountry,
  UpdateCountryDetails,
} from "./updateCountry.type.ts";

type UpdateCountry = (details: UpdateCountryDetails, context?: Context) => any;

/**
 * Represent updateCountry (update Country on db)
 * @function
 * @param details
 * @param context
 */
export const updateCountry: UpdateCountry = async (details, context) => {
  // TODO:authentication should be done

  const detailsIsRight = checkUpdateCountry({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id, name, abbr, logo, geometries },
    get,
  } = details;

  await countries.updateOne(
    { _id: new Bson.ObjectID(_id) },
    { $set: { name, abbr, logo, geometries } }
  );

  const foundNewCountry = await countries.findOne({
    _id: new Bson.ObjectID(_id),
  });

  //2 update Country in Menu And Table collection
  await states.updateMany(
    { "country._id": new Bson.ObjectID(_id) },
    { $set: { country: foundNewCountry } }
  );
  await cities.updateMany(
    { "country._id": new Bson.ObjectID(_id) },
    { $set: { country: foundNewCountry } }
  );

  return get ? getCountry({ _id: foundNewCountry!._id, get }) : foundNewCountry;
};
