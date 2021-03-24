import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RDish, dishSelectable, Recipe, Rating } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update dish
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateDish = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        strict: true,
        props: {
          /**
           * The Values of the dish that is going to be updated
           */
          _id: { type: "string", optional: true },
          name: { type: "string" },
          price: { type: "number" },
          discount: { type: "number", optional: true },
          recipe: {
            type: "object",
            props: {
              description: { type: " string" },
              ingredients: { type: "string" },
            },
          },
          photos: { type: "string" },
          dishrating: { type: "string" }, //rating delete later
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
});

/**
 * Represent Input details
 * this is input of updating dish
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateDishDetails {
  set: {
    //this is the _id of the Dish that we want to update
    _id: string;
    //these fields are the fields that can be modified on Dish
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
