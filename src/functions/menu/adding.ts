import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import {
  menus,
  menuSelectable,
  Menu,
  RMenu,
  MenuCategory,
} from "../../schemas/menu.ts";
import { throwError } from "../../utils/mod.ts";
import { getMenu } from "../mod.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          subHeading: { type: "string", optional: true },
          icon: { type: "any", optional: true },
          description: { type: "string", optional: true },
          menuCategory: {
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
                    optional: true,
                    props: {
                      description: { type: "string" },
                      ingredients: { type: "array" },
                    },
                    photos: { type: "array" },
                    dishRating: {
                      type: "object",
                      props: {
                        rateNumber: {
                          type: "object",
                          props: {
                            One: "1",
                            Tow: "2",
                            Three: "3",
                            Four: "4",
                            Five: "5",
                          },
                          rateDescribtion: { type: "string" },
                        },
                      },
                    },
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
  },
});

interface addingMenuDetails {
  set: {
    name: string;
    subHeading?: string;
    icon?: File;
    description?: string;
    menuCategory: MenuCategory[];
  };
  get: RMenu;
}

type AddingMenu = (details: addingMenuDetails) => Promise<Partial<Menu>>;

export const addingMenu: AddingMenu = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, subHeading, icon, description, menuCategory },
    get,
  } = details;
  const createdMenu = await menus.insertOne({
    name,
    subHeading,
    icon,
    description,
    menuCategory,
  });
  console.log(createdMenu);
  const ob = new Bson.ObjectID(createdMenu);
  return get ? getMenu({ _id: ob, get }) : { _id: ob };
};
