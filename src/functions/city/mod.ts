import { addingCity } from "./adding.ts";
import { deleteCityFn } from "./deleteCity.fn.ts";
import { updateCity } from "./updateCity.fn.ts";
import { City } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type CityDoit = "Add" | "Delete" | "Update";

type CityFns = (doit: CityDoit, details: any) => Promise<Partial<City>>;

export const cityFns: CityFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingCity(details),
        ["Delete"]: async () => await deleteCityFn(details),
        ["Update"]: async () => await updateCity(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
