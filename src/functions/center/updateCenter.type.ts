import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RCenter, Certificate, centerSelectable } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update center
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateCenter = v.compile({
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
          name: { type: "string", optional: true },
          phone: { type: "number", optional: true },
          certificate: {
            type: "object",
            optional: true,
            props: {
              title: { type: "string" },
              issuedAt: { type: "any" },
              expiryDate: { type: "any" },
              issuedBy: { type: "string" },
            },
          },
          activeHours: {
            optional: true,
            type: "tuple",
            items: ["number", "number", { type: "string", empty: true }],
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: centerSelectable(1),
      },
    },
  },
});

/**
 * Represent Input details
 * this is input of updating center
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateCenterDetails {
  set: {
    //this is the _id of the Center that we want to update
    _id?: string;
    //these fields are the fields that can be modified on Center
    name?: string;
    phone?: number;
    certificate?: Certificate[];
    //activeHours:[open, close, title (like mornning or breakfast)]
    activeHours?: [number, number, string?][];
  };
  get: RCenter;
}
