import { Bson } from "../../../../db.ts";
import { states, State, RState } from "../../../schemas/state.ts";
import { makeLookUp } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { getCities } from "../../city/funcs/mod.ts";
import { getParish } from "../../state/funcs/mod.ts";

type GetStatesInput = { filter: Bson.Document; getObj: RState };
type GetStatesFn = ({ filter, getObj }: GetStatesInput) => Promise<State[]>;
export const getStates: GetStatesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["parish", "cities"]);
  const foundedStates = await states.find(filter, { projection });
  let returnStates = await foundedStates.toArray();
  if (getObj.parish)
    returnStates = await makeLookUp(
      returnStates,
      getParish,
      "parish",
      getObj.parishes
    );
  return returnStates;
};
