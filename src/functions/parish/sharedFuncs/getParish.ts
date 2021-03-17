import { Bson } from "../../../../db.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";
import { parishes, Parish, RParish } from "../../../schemas/parish.ts";

type GetParishInput = { _id: Bson.ObjectID; get: RParish };
type GetParishFn = ({ _id, get }: GetParishInput) => Promise<Parish>;
export const getParish: GetParishFn = async ({ _id, get }) => {
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
  const foundedParish = await parishes.findOne({ _id }, { projection });
  const doRelation = async (parish: Parish, get: RParish) => {
    return parish;
  };
  return foundedParish
    ? await doRelation(foundedParish, get)
    : throwError("can not find parish");
};
