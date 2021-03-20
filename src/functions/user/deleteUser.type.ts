import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RUser, userSelectable } from "../../schemas/mod.ts";

/**
 * this is validator for Delete User
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value involves (_id )
 */

const v = new FastestValidator();
export const checkDeleteUser = v.compile({
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
        props: userSelectable(1),
      },
    },
  },
});
/**
 * Represent Input details
 * this is input of deleting User
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface DeleteUserDetails {
  set: {
    _id: string;
  };
  get: RUser;
}
