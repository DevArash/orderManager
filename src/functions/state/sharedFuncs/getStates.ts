import { Bson } from "../../../../db.ts";
import { makeLookUp } from "../../../utils/mod.ts";
import { getCities } from "../../city/sharedFuncs/mod.ts";
import { states, State, RState } from "../../../schemas/state.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetStatesInput = { filter: Bson.Document; getObj: RState };
type GetStatesFn = ({ filter, getObj }: GetStatesInput) => Promise<State[]>;
export const getStates: GetStatesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["parish", "cities"]);
  const foundedStates = await states.find(filter, { projection });
  let returnStates = await foundedStates.toArray();
  if (getObj.cities)
    returnStates = await makeLookUp(
      returnStates,
      getCities,
      "states",
      getObj.cities
    );
  return returnStates;
};
