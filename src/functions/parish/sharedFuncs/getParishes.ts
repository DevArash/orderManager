import { Bson } from "../../../../db.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { parishes, Parish, RParish } from "../../../schemas/parish.ts";

type GetParishesInput = { filter: Bson.Document; getObj: RParish };
type GetParishesFn = ({
  filter,
  getObj,
}: GetParishesInput) => Promise<Parish[]>;
export const getParishes: GetParishesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], []);
  const foundedParishes = await parishes.find(filter, { projection });
  let returnParishes = await foundedParishes.toArray();
  return returnParishes;
};
