import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Menu } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingMenu } from "./adding.ts";
import { deleteMenuFn } from "./deleteMenu.fn.ts";
import { updateMenu } from "./updateMenu.fn.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type MenuDoit = "Add" | "Delete" | "Update";

type MenuFns = (doit: MenuDoit, details: any) => Promise<Partial<Menu>>;

export const menuFns: MenuFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingMenu(details),
        ["Delete"]: async () => await deleteMenuFn(details),
        ["Update"]: async () => await updateMenu(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
