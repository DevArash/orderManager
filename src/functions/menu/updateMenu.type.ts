import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { RMenu, menuSelectable, MenuCategory } from "../../schemas/mod.ts";
const v = new FastestValidator();

/**
 * this is validator for update menu
 * this validate the input object,
 * has a tow part {set,get}
 * object "get" for specify user what wants to return
 * object "set" for validate input value
 */

export const checkUpdateMenu = v.compile({
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
          name: { type: "string" },
          subHeading: { type: "string", optional: true },
          icon: { type: "string", optional: true },
          description: { type: "string", optional: true },
          meunCategory: {
            type: "object",
            props: {
              title: { type: "string" },
              description: { type: "string", optional: true },
              dishes: {
                type: "object",
                props: {
                  name: { type: "string" },
                  price: { type: "number" },
                  discount: { type: "number", optional: true },
                  recipe: {
                    type: "object",
                    props: {
                      description: { type: " string" },
                      ingredients: { type: "string" },
                    },
                  },
                  photos: { type: "string" },
                  dishrating: { type: "string" }, //rating delete later
                  calorie: { type: "number", optional: true },
                },
              },
            },
          },
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
    subHeading?: string;
    icon?: string;
    description?: string;
    menuCategory: MenuCategory[];
  };
  get: RMenu;
}
