import { Bson } from "../../../../db.ts";
import { throwError } from "../../../utils/mod.ts";
import { getCities } from "../../city/funcs/mod.ts";
import { getStates } from "../../state/funcs/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { countries, Country, RCountry } from "../../../schemas/mod.ts";

type GetCountryInput = { _id: Bson.ObjectID; get: RCountry };
type GetCountryFn = ({ _id, get }: GetCountryInput) => Promise<Country>;
export const getCountry: GetCountryFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["states", "cities"]);
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
  const foundedCountry = await countries.findOne({ _id }, { projection });
  const doRelation = async (country: Country, get: RCountry) => {
    if (get.cities)
      country.cities = await getCities({
        filter: { country: country._id },
        getObj: get.cities,
      });
    if (get.states)
      country.states = await getStates({
        filter: { country: country._id },
        getObj: get.states,
      });
    return country;
  };
  return foundedCountry
    ? await doRelation(foundedCountry, get)
    : throwError("can not find country");
};
