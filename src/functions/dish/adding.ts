import { getDish } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { Recipe } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://esm.sh/fastest-validator@1";
import { dishes, dishSelectable, Dish, RDish } from "../../schemas/mod.ts";

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          price: { type: "number" },
          discount: { type: "number", optional: true },
          recipe: {
            type: "object",
            optional: true,
            props: {
              description: { type: "string" },
              ingredients: { type: "string" },
            },
          },
          photos: { type: "string" },
          calorie: { type: "number", optional: true },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: dishSelectable(1),
      },
    },
  },
};

const check = v.compile(schema);

interface addingDishDetails {
  set: {
    name: string;
    price: number;
    discount?: number;
    recipe?: Recipe;
    photos: string[];
    calorie?: number;
  };
  get: RDish;
}

type AddingDish = (details: addingDishDetails) => Promise<Partial<Dish>>;

export const addingDish: AddingDish = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, price, discount, recipe, photos, calorie },
    get,
  } = details;
  const createdDish = await dishes.insertOne({
    name,
    price,
    discount,
    recipe,
    photos,
    calorie,
  });
  console.log(createdDish);
  const ob = new Bson.ObjectID(createdDish);
  return get ? getDish({ _id: ob, get }) : { _id: ob };
};
