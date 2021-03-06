import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { getCity } from "./sharedFuncs/mod.ts";
import { cities, City, citySelectable, RCity } from "../../schemas/mod.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          geometries: {
            type: "tuple",
            items: ["number", "number"],
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: citySelectable(1),
      },
    },
  },
};

const check = v.compile(schema);

interface addingCityDetails {
  set: { name: string; geometries: number };
  get: RCity;
}

type AddingCity = (details: addingCityDetails) => Promise<Partial<City>>;

export const addingCity: AddingCity = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, geometries },
    get,
  } = details;
  const createdState = await cities.insertOne({
    name,
    geometries,
  });
  const ob = new Bson.ObjectID(createdState);
  return get ? getCity({ _id: ob, get }) : { _id: ob };
};
