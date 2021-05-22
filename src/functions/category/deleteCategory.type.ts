import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RCategory, categorySelectable } from "../../schemas/mod.ts";

/**
 * this is validator for Delete Category
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value involves (_id )
 */

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    strict: "true",
    props: {
      set: {
        type: "object",
        props: {
          _id: { type: "string" },
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

export const checkDeleteCategory = v.compile(schema);

/**
 * Represent Input details
 * this is input of deleting Category
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface DeleteCategoryDetails {
  set: {
    _id: string;
  };
  get: RCategory;
}
