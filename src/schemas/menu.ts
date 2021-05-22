import db from "../../db.ts";
import { Base, RType, fieldType } from "./mod.ts";

export interface PuMenu extends Base {
  name: string;
}

export interface Menu extends PuMenu {}

export interface RMenu {
  _id: RType;
  name: RType;
}

export const menuSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
  };
};

export const menus = db.collection<Menu>("Menus");
