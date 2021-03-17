import { Bson } from "../../../../db.ts";
import { cities, City, RCity } from "../../../schemas/city.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetCitiesInput = { filter: Bson.Document; getObj: RCity };
type GetCitiesFn = ({ filter, getObj }: GetCitiesInput) => Promise<City[]>;
export const getCities: GetCitiesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], []);
  const foundedCities = await cities.find(filter, { projection });
  let returnCities = await foundedCities.toArray();
  return returnCities;
};
