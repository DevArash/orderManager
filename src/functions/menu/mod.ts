import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Menu } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { addingMenu } from "./adding.ts";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type MenuDoit = "Adding";

type MenuFns = (doit: MenuDoit, details: any) => Promise<Partial<Menu>>;

export const menuFns: MenuFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingMenu(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
