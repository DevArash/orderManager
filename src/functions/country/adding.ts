import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import {
  countries,
  Country,
  countrySelectable,
  RCountry,
} from "../../schemas/country.ts";
import { throwError } from "../../utils/mod.ts";
import { getCountry } from "./sharedFuncs/mod.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          abbr: { type: "string" },
          logo: { type: "string" },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: countrySelectable(1),
      },
    },
  },
});

interface addingCountryDetails {
  set: { name: string; abbr: string; logo: string };
  get: RCountry;
}

type AddingCountry = (
  details: addingCountryDetails
) => Promise<Partial<Country>>;

export const addingCountry: AddingCountry = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, abbr, logo },
    get,
  } = details;
  const createdCountry = await countries.insertOne({
    name,
    abbr,
    logo,
  });
  const ob = new Bson.ObjectID(createdCountry);
  return get ? getCountry({ _id: ob, get }) : { _id: ob };
};
