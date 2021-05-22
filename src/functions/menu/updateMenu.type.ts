import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RMenu, menuSelectable } from "../../schemas/mod.ts";

/**
 * this is validator for update menu
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        strict: true,
        props: {
          /**
           * The Values of the menu that is going to be updated
           */
          _id: { type: "string", optional: true },
          name: { type: "string", optional: true },
        },
        get: {
          type: "object",
          optional: true,
          props: menuSelectable(1),
        },
      },
    },
  },
};
export const checkUpdateMenu = v.compile(schema);

/**
 * Represent Input details
 * this is input of updating menu
 * object "get" for specify user what wants to return
 * object "set" for input value involve(name)
 * @interface
 */
export interface UpdateMenuDetails {
  set: {
    //this is the _id of the Menu that we want to update
    _id: string;
    //these fields are the fields that can be modified on Menu
    name: string;
  };
  get: RMenu;
}
