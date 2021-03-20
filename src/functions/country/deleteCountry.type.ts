import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RCountry, countrySelectable } from "../../schemas/mod.ts";

/**
 * this is validator for Delete Center
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value involves (_id )
 */

const v = new FastestValidator();
export const checkDeleteCountry = v.compile({
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
        props: countrySelectable(1),
      },
    },
  },
});
/**
 * Represent Input details
 * this is input of deleting Country
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface DeleteCountryDetails {
  set: {
    _id: string;
  };
  get: RCountry;
}
