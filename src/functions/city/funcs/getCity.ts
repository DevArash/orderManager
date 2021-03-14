import { Bson } from "../../../../db.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { cities, City, RCity } from "../../../schemas/city.ts";

type GetCityInput = { _id: Bson.ObjectID; get: RCity };
type GetCityFn = ({ _id, get }: GetCityInput) => Promise<City>;
export const getCity: GetCityFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], []);
  console.log("                      ");
  console.log("++++++++++++++++++++++");
  console.log("                      ");
  console.group("projection => : ");
  console.log("                      ");
  console.log(projection);
  console.log("                      ");
  console.groupEnd();
  console.log("                      ");
  console.log("----------------------");
  console.log("                      ");
  const foundedCity = await cities.findOne({ _id }, { projection });
  const doRelation = async (city: City, get: RCity) => {
    return city;
  };
  return foundedCity
    ? await doRelation(foundedCity, get)
    : throwError("can not find City");
};
