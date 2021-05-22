import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import {
  categories,
  categorySelectable,
  Category,
  RCategory,
} from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { getCategory } from "./sharedFuncs/mod.ts";

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          image: { type: "string" },
          description: { type: "string" },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: categorySelectable(1),
      },
    },
  },
};

const check = v.compile(schema);

interface addingCategoryDetails {
  set: {
    name: string;
    image: string;
    description: string;
  };
  get: RCategory;
}

type AddingCategory = (
  details: addingCategoryDetails
) => Promise<Partial<Category>>;

export const addingCategory: AddingCategory = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, image, description },
    get,
  } = details;
  const createdCategory = await categories.insertOne({
    name,
    image,
    description,
  });
  console.log(createdCategory);
  const ob = new Bson.ObjectID(createdCategory);
  return get ? getCategory({ _id: ob, get }) : { _id: ob };
};
