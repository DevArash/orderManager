import { Bson } from "../../../../db.ts";
import { categories, Category, RCategory } from "../../../schemas/mod.ts";
import { throwError } from "../../../utils/mod.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetCategoryInput = { _id: Bson.ObjectID; get: RCategory };
type GetCategoryFn = ({ _id, get }: GetCategoryInput) => Promise<Category>;
export const getCategory: GetCategoryFn = async ({ _id, get }) => {
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
  const foundedCategory = await categories.findOne({ _id }, { projection });
  const doRelation = async (category: Category, get: RCategory) => {
    return category;
  };
  return foundedCategory
    ? await doRelation(foundedCategory, get)
    : throwError("can not find Category");
};
