import db from "../../db.ts";
import { Base, RType, fieldType } from "./mod.ts";

export interface PuCategory extends Base {
  name: string;
  image: string;
  description: string;
}

export interface Category extends PuCategory {}

export interface RCategory {
  _id: RType;
  name: RType;
  image: RType;
  description: RType;
}

export const categorySelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    image: fieldType,
    descriptio: fieldType,
  };
};

export const categories = db.collection<Category>("Categories");
