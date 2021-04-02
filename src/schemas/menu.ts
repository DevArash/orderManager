import db from "../../db.ts";
import { Base, RType, fieldType, Dish } from "./mod.ts";

export interface MenuCategory {
  title: string;
  description?: string;
  dishes: Dish[];
}

export interface PuMenu extends Base {
  name: string;
  subHeading?: string;
  icon?: string;
  description?: string;
  menuCategory: MenuCategory[];
}

export interface Menu extends PuMenu {}

export interface RMenu {
  _id: RType;
  name: RType;
  subHeading: RType;
  icon: RType;
  description: RType;
  menuCategory: RType;
}

export const menuSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    subHeading: fieldType,
    icon: fieldType,
    description: fieldType,
    menuCategory: fieldType,
  };
};

export const menus = db.collection<Menu>("Menus");
