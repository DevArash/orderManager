import db from "../../db.ts";
import { Base, fieldType, RType, Recipe } from "./mod.ts";
export interface PuDish extends Base {
  name: string;
  price: number;
  discount?: number;
  recipe?: Recipe;
  photos: string[];
  calorie?: number;
  preparationTime: number;
}

export interface Dish extends PuDish {}

export interface RDish {
  _id: RType;
  name: RType;
  price: RType;
  discont?: RType;
  recipe?: RType;
  photos: RType;
  calorie?: RType;
  preparationTime: RType;
}

export const dishSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    price: fieldType,
    discont: fieldType,
    recipe: fieldType,
    photos: fieldType,
    calorie: fieldType,
    preparationTime: fieldType,
  };
  returnObj;
};

export const dishes = db.collection<Dish>("Dishes");
