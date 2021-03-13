import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import {
  parishes,
  Parish,
  parishSelectable,
  RParish,
} from "../../schemas/parish.ts";
import { throwError } from "../../utils/mod.ts";
import { getCountry } from "./funcs/mod.ts";

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
          logo: { type: "file" },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: parishSelectable(1),
      },
    },
  },
});

interface addingParishDetails {
  set: { name: string; abbr: string; logo: File };
  get: RParish;
}

type AddingParish = (details: addingParishDetails) => Promise<Partial<Parish>>;

export const addingParish: AddingParish = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, abbr, logo },
    get,
  } = details;
  const createdParish = await parishes.insertOne({
    name,
    abbr,
    logo,
  });
  const ob = new Bson.ObjectID(createdParish);
  return get ? getCountry({ _id: ob, get }) : { _id: ob };
};
