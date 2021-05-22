import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import { menus, menuSelectable, Menu, RMenu } from "../../schemas/menu.ts";
import { throwError } from "../../utils/mod.ts";
import { getMenu } from "../mod.ts";

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: menuSelectable(1),
      },
    },
  },
};

const check = v.compile(schema);

interface addingMenuDetails {
  set: {
    name: string;
  };
  get: RMenu;
}

type AddingMenu = (details: addingMenuDetails) => Promise<Partial<Menu>>;

export const addingMenu: AddingMenu = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name },
    get,
  } = details;
  const createdMenu = await menus.insertOne({
    name,
  });
  console.log(createdMenu);
  const ob = new Bson.ObjectID(createdMenu);
  return get ? getMenu({ _id: ob, get }) : { _id: ob };
};
