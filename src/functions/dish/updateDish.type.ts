import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RDish, dishSelectable, Recipe } from "../../schemas/mod.ts";

/**
 * this is validator for update dish
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          _id: { type: "string", optional: true },
          name: { type: "string", optional: true },
          price: { type: "number", optional: true },
          discount: { type: "number", optional: true },
          recipe: {
            type: "object",
            optional: true,
            props: {
              description: { type: "string", optional: true },
              ingredients: { type: "string", optional: true },
            },
          },
          photos: { type: "string", optional: true },
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

export const checkUpdateDish = v.compile(schema);

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
    calorie?: number;
  };
  get: RDish;
}
