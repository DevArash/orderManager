import db from "../../db.ts";
import { Recipe } from "./mod.ts";
import { Rating } from "./rating.ts";
import { Base, fieldType, RType } from "./mod.ts";
export interface PuDish extends Base {
  name: string;
  price: number;
  discount?: number;
  recipe?: Recipe;
  photos: string[];
  dishRating: Rating;
  calorie?: number;
}

export interface Dish extends PuDish {}

export const centers = db.collection<Dish>("Dishes");

export interface RDish {
  _id: RType;
  name: RType;
  price: RType;
  discont?: RType;
  recepies?: RType;
  photos: RType;
  dishRating: RType;
  calorie?: RType;
}

export const dishSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    price: fieldType,
    discont: fieldType,
    recepies: fieldType,
    photos: fieldType,
    dishRating: fieldType,
    calorie: fieldType,
  };
  returnObj;
};

export const dishes = db.collection<Dish>("Dishes");
