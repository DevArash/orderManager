import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RTable, tableSelectable } from "../../schemas/mod.ts";

/**
 * this is validator for Delete Table
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value involves (_id )
 */

const v = new FastestValidator();
export const checkDeleteTable = v.compile({
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
        props: tableSelectable(1),
      },
    },
  },
});
/**
 * Represent Input details
 * this is input of deleting Table
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface DeleteTableDetails {
  set: {
    _id: string;
  };
  get: RTable;
}
