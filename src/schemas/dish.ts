import db from "../../db.ts";
import { Recipe } from "./recipe.ts";
import { Rating } from "./rating.ts";
import { Base } from "./utils/bases/base.ts";

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
