import { Recipe } from "./recipe.ts";

export interface Dish {
  name: string;
  price: number;
  discount?: number;
  recipe: Recipe;
  photos: string[];
  cookingStyle?: CookingStyle;
  dishRating: Rating;
  calorie?: number;
}

enum CookingStyle {
  Baking = "BAKING",
  Frying = "FRYING",
  Steaming = "STEAMING",
  Boiling = "BOILING",
}

interface Rating {
  rateNumber: number;
  rateDescribtion: string;
}
