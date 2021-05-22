import { Bson } from "../../../../db.ts";
import { categories, Category, RCategory } from "../../../schemas/mod.ts";
import { makeLookUp } from "../../../utils/makeLookUp.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetCategoriesInput = { filter: Bson.Document; getObj: RCategory };
type GetCategoriesFn = ({
  filter,
  getObj,
}: GetCategoriesInput) => Promise<Category[]>;
export const getCategories: GetCategoriesFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], []);
  const foundedCategories = await categories.find(filter, { projection });
  let returnCategories = await foundedCategories.toArray();
  return returnCategories;
};
