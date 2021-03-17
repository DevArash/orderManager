import { addingCountry } from "./adding.ts";
import { Country } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Adding"],
  },
});

export type CountryDoit = "Adding";

type CountryFns = (
  doit: CountryDoit,
  details: any
) => Promise<Partial<Country>>;

export const countryFns: CountryFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Adding"]: async () => await addingCountry(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
