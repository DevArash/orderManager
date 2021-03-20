import { addingCity } from "./adding.ts";
import { deleteCityFn } from "./deleteCity.fn.ts";
import { City } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding", "Delete"],
  },
});

export type CityDoit = "Adding" | "Delete";

type CityFns = (doit: CityDoit, details: any) => Promise<Partial<City>>;

export const cityFns: CityFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingCity(details),
        ["Delete"]: async () => await deleteCityFn(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
