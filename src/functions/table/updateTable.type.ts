import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Reserve, RTable, tableSelectable } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update table
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateTable = v.compile({
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
          tableNo: { type: "number", optional: true },
          tableCapacity: { type: "number", optional: true },
          reserve: {
            type: "object",
            props: {
              reservable: "boolean",
              reservedBy: "string",
            },
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: tableSelectable(1),
      },
    },
  },
});

/**
 * Represent Input details
 * this is input of updating Table
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateTableDetails {
  set: {
    //this is the _id of the Table that we want to update
    _id: string;
    //these fields are the fields that can be modified on Table
    tableNo?: number;
    tableCapacity: number;
    reserve: Reserve;
  };
  get: RTable;
}
