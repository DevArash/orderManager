import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RCategory, categorySelectable } from "../../schemas/mod.ts";

/**
 * this is validator for update schema
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
        strict: true,
        props: {
          /**
           * The Values of the menu that is going to be updated
           */
          _id: { type: "string", optional: true },
          name: { type: "string", optional: true },
          image: { type: "string", optional: true },
          description: { type: "string", optional: true },
        },
        get: {
          type: "object",
          optional: true,
          props: categorySelectable(1),
        },
      },
    },
  },
};
export const checkUpdateCategory = v.compile(schema);

/**
 * Represent Input details
 * this is input of updating category
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateCategoryDetails {
  set: {
    //this is the _id of the Category that we want to update
    _id: string;
    //these fields are the fields that can be modified on Category
    name: string;
    image: string;
    description: string;
  };
  get: RCategory;
}
