import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RCity, citySelectable } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update city
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateCity = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        strict: true,
        props: {
          /**
           * The Values of the city that is going to be updated
           */
          _id: { type: "string", min: 2, max: 255, optional: true },
          name: { type: "string" },
          geometries: {
            type: "tuple",
            items: ["number", "number"],
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: citySelectable(1),
      },
    },
  },
});

/**
 * Represent Input details
 * this is input of updating city
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateCityDetails {
  set: {
    //this is the _id of the City that we want to update
    _id: string;
    //these fields are the fields that can be modified on City
    name: string;
    geometries: ["number", "number"];
  };
  get: RCity;
}
