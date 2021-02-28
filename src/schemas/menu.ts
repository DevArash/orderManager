import db from "../../db.ts";
import { Dish } from "./dish.ts";
import { RType } from "./utils/rType.ts";
import { Base } from "./utils/bases/base.ts";
import { fieldType } from "./utils/fieldType.ts";

export interface MenuCategory {
  title: string;
  description: string;
  dishes: Dish[];
}

export interface PuMenu extends Base {
  name: string;
  subHeading: string;
  icon: File;
  description: string;
  menuCategory: MenuCategory[];
}

export interface Menu extends PuMenu {}

export interface RMenu {
  _id: RType;
  name: RType;
  subHeading: RType;
  icon: RType;
  description: RType;
  menuType: RType;
}

export const menuSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    subHeading: fieldType,
    icon: fieldType,
    description: fieldType,
    menuType: fieldType,
  };
};

export const menus = db.collection<Menu>("Menus");
