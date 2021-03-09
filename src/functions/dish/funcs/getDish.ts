import { Bson } from "../../../../db.ts";
import { dishes, Dish, RDish } from "../../../schemas/dish.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetDishInput = { _id: Bson.ObjectID; get: RDish };
type GetDishFn = ({ _id, get }: GetDishInput) => Promise<Dish>;
export const getDish: GetDishFn = async ({ _id, get }) => {
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
  const foundedDish = await dishes.findOne({ _id }, { projection });
  const doRelation = async (dish: Dish, get: RDish) => {
    return dish;
  };
  return foundedDish
    ? await doRelation(foundedDish, get)
    : throwError("can not find dish");
};
