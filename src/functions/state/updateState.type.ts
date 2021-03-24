import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RState, stateSelectable } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update state
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateState = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        strict: true,
        props: {
          /**
           * The Values of the center that is going to be updated
           */
          _id: { type: "string", optional: true },
          name: { type: "string" },
          logo: { type: "string" },
          geometries: {
            type: "tuple",
            items: ["number", "number"],
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: stateSelectable(1),
      },
    },
  },
});

/**
 * Represent Input details
 * this is input of updating State
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateStateDetails {
  set: {
    //this is the _id of the State that we want to update
    _id: string;
    //these fields are the fields that can be modified on State
    name: string;
    logo: string;
    geometries: {
      type: "polygon";
      cordinate: [number, number][];
    };
  };
  get: RState;
}
