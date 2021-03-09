import FastestValidator from "https://esm.sh/fastest-validator@1";
import { Bson } from "../../../db.ts";
import { dishes, dishSelectable, Dish, RDish } from "../../schemas/dish.ts";
import { Rating } from "../../schemas/rating.ts";
import { Recipe } from "../../schemas/recipe.ts";
import { throwError } from "../../utils/throwError.ts";
import { getDish } from "./funcs/getDish.ts";

const v = new FastestValidator();
const check = v.compile({
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
            photos: { type: "string" },
            dishRating: {
              type: "object",
              rateNumber: {
                type: "object",
                props: {
                  One: { type: "string" },
                  Tow: { type: "string" },
                  Three: { type: "string" },
                  Four: { type: "string" },
                  Five: { type: "string" },
                },
                rateDescribtion: { type: "string" },
              },
            },
            calorie: { type: "number", optional: true },
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: dishSelectable(1),
      },
    },
  },
});

interface addingDishDetails {
  set: {
    name: string;
    price: number;
    discount?: number;
    recipe?: Recipe;
    photos: string[];
    dishRating: Rating;
    calorie?: number;
  };
  get: RDish;
}

type AddingDish = (details: addingDishDetails) => Promise<Partial<Dish>>;

export const addingDish: AddingDish = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, price, discount, recipe, photos, dishRating, calorie },
    get,
  } = details;
  const createdDish = await dishes.insertOne({
    name,
    price,
    discount,
    recipe,
    photos,
    dishRating,
    calorie,
  });
  console.log(createdDish);
  const ob = new Bson.ObjectID(createdDish);
  return get ? getDish({ _id: ob, get }) : { _id: ob };
};
