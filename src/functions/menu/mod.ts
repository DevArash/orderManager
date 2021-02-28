import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Menu } from "../../schemas/menu.ts";
import { throwError } from "../../utils/throwError.ts";
import { addingMenu } from "./adding.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["adding"],
  },
});

export type MenuDoit = "adding";

type MenuFns = (doit: MenuDoit, details: any) => Promise<Partial<Menu>>;

export const menuFns: MenuFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["adding"]: async () => await addingMenu(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
