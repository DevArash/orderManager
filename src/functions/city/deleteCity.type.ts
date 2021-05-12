import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RCity, citySelectable } from "../../schemas/mod.ts";

/**
 * this is validator for Delete City
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
        props: citySelectable(1),
      },
    },
  },
};

export const checkDeleteCity = v.compile(schema);

/**
 * Represent Input details
 * this is input of deleting City
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface DeleteCityDetails {
  set: {
    _id: string;
  };
  get: RCity;
}
