import { addingCountry } from "./adding.ts";
import { deleteCountryFn } from "./deleteCountry.fn.ts";
import { updateCountry } from "./updateCountry.fn.ts";
import { Country } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["Add", "Delete", "Update"],
  },
});

export type CountryDoit = "Add" | "Delete" | "Update";

type CountryFns = (
  doit: CountryDoit,
  details: any
) => Promise<Partial<Country>>;

export const countryFns: CountryFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["Add"]: async () => await addingCountry(details),
        ["Delete"]: async () => await deleteCountryFn(details),
        ["Update"]: async () => await updateCountry(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
