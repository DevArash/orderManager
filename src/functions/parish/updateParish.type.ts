import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RParish, parishSelectable } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update Parish
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateParish = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        strict: true,
        props: {
          /**
           * The Values of the Parish that is going to be updated
           */
          _id: { type: "string", optional: true },
          name: { type: "string" },
          geometries: {
            optional: true,
            type: "tuple",
            items: ["number", "number"],
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: parishSelectable(1),
      },
    },
  },
});

/**
 * Represent Input details
 * this is input of updating Parish
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateParishDetails {
  set: {
    //this is the _id of the Parish that we want to update
    _id: string;
    //these fields are the fields that can be modified on Parish
    name: string;
    geometries: {
      type: "polygon";
      cordinate: [number, number][];
    };
  };
  get: RParish;
}
