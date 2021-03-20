import { getCountry } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import { countries, states, cities } from "./../../schemas/mod.ts";
import {
  checkDeleteCountry,
  DeleteCountryDetails,
} from "./deleteCountry.type.ts";

const deleteCountry = async (_id: string) => {
  const deletedCountry = await countries.findOne({
    _id: new Bson.ObjectID(_id),
  });
  // step1: delete the State and all City of this Country,
  const a = await states.deleteMany({
    "country._id": deletedCountry!._id,
  });
  const b = await cities.deleteMany({
    "country._id": deletedCountry!._id,
  });
  //step 2: delete the Country itself
  await countries.deleteOne({ _id: new Bson.ObjectID(_id) });
  return deletedCountry;
};

type DeleteCountry = (details: DeleteCountryDetails, context?: Context) => any;

/**
 * @function
 * Represent delete blogTag(delete the desired blogTag from DB)
 * @param details
 * @param context
 */
export const deleteCountryFn: DeleteCountry = async (details, context) => {
  const detailsIsRight = checkDeleteCountry({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return details.get
    ? getCountry({ _id: objId, get: details.get })
    : deleteCountry(_id);
};
