import { Bson } from "../../../../db.ts";
import { dishes, Dish, RDish } from "../../../schemas/dish.ts";
import { makeLookUp } from "../../../utils/makeLookUp.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetDishesInput = { filter: Bson.Document; getObj: RDish };
type GetDishesFn = ({ filter, getObj }: GetDishesInput) => Promise<Dish[]>;
export const getDishes: GetDishesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], ["tables", "menus"]);
  const foundedDishes = await dishes.find(filter, { projection });
  let returnDishes = await foundedDishes.toArray();
  return returnDishes;
};
