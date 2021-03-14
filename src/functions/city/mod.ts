import { addingCity } from "./adding.ts";
import { City } from "../../schemas/city.ts";
import { throwError } from "../../utils/throwError.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type CityDoit = "Adding";

type CityFns = (doit: CityDoit, details: any) => Promise<Partial<City>>;

export const cityFns: CityFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingCity(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
