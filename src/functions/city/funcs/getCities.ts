import { Bson } from "../../../../db.ts";
import { cities, City, RCity } from "../../../schemas/city.ts";
import { makeLookUp } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getParish } from "../../parish/funcs/mod.ts";

type GetCitiesInput = { filter: Bson.Document; getObj: RCity };
type GetCitiesFn = ({ filter, getObj }: GetCitiesInput) => Promise<City[]>;
export const getCities: GetCitiesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["parish"]);
  const foundedCities = await cities.find(filter, { projection });
  let returnCities = await foundedCities.toArray();
  if (getObj.parish)
    returnCities = await makeLookUp(
      returnCities,
      getParish,
      "parish",
      getObj.parishes
    );
  return returnStates;
};
