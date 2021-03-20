import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RMenu, menuSelectable } from "../../schemas/mod.ts";

/**
 * this is validator for Delete Menu
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value involves (_id )
 */

const v = new FastestValidator();
export const checkDeleteMenu = v.compile({
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
        props: menuSelectable(1),
      },
    },
  },
});
/**
 * Represent Input details
 * this is input of deleting Menu
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface DeleteMenuDetails {
  set: {
    _id: string;
  };
  get: RMenu;
}
