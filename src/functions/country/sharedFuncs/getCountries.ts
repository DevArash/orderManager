import { Bson } from "../../../../db.ts";
import { makeLookUp } from "../../../utils/mod.ts";
import { getStates } from "../../state/sharedFuncs/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { countries, Country, RCountry } from "../../../schemas/mod.ts";

type GetCountriesInput = { filter: Bson.Document; getObj: RCountry };
type GetCountriesFn = ({
  filter,
  getObj,
}: GetCountriesInput) => Promise<Country[]>;
export const getCountries: GetCountriesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["states", "cities"]);
  const foundedCountries = await countries.find(filter, { projection });
  let returnCountries = await foundedCountries.toArray();
  if (getObj.states)
    returnCountries = await makeLookUp(
      returnCountries,
      getStates,
      "states",
      getObj.states
    );
  return returnCountries;
};
