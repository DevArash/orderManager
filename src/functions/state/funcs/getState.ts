import { Bson } from "../../../../db.ts";
import { throwError } from "../../../utils/mod.ts";
import { getCities } from "../../city/funcs/mod.ts";
import { getCountries } from "../../country/funcs/getCountries.ts";
import { states, State, RState } from "../../../schemas/state.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetStateInput = { _id: Bson.ObjectID; get: RState };
type GetStateFn = ({ _id, get }: GetStateInput) => Promise<State>;
export const getState: GetStateFn = async ({ _id, get }) => {
  const projection = makeProjections(get, [], ["countries", "cities"]);
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
  const foundedState = await states.findOne({ _id }, { projection });
  const doRelation = async (state: State, get: RState) => {
    if (get.cities)
      state.cities = await getCities({
        filter: { state: state._id },
        getObj: get.cities,
      });
    if (get.countries)
      state.cities = await getCountries({
        filter: { state: state._id },
        getObj: get.countries,
      });
    return state;
  };
  return foundedState
    ? await doRelation(foundedState, get)
    : throwError("can not find state");
};
