import { Recipe } from "./recipe.ts";
import { Rating } from "./rating.ts";

export interface Dish {
  name: string;
  price: number;
  discount?: number;
  recipe?: Recipe;
  photos: string[];
  dishRating: Rating;
  calorie?: number;
}
