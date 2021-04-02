import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RCountry, countrySelectable } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update country
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateCountry = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        strict: true,
        props: {
          /**
           * The Values of the country that is going to be updated
           */
          _id: { type: "string", optional: true },
          name: { type: "string", optional: true },
          abbr: { type: "string", optional: true },
          logo: { type: "string", optional: true },
          geometries: {
            optional: true,
            type: "tuple",
            item: ["number", "number"],
          },
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
 * this is input of updating country
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateCountryDetails {
  set: {
    //this is the _id of the Country that we want to update
    _id?: string;
    //these fields are the fields that can be modified on Country
    name?: string;
    abbr?: string;
    logo?: string;
    geometries?: ["number", "number"];
  };
  get: RCountry;
}
