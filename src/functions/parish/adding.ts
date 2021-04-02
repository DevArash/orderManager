import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import {
  parishes,
  Parish,
  parishSelectable,
  RParish,
} from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { getParish } from "../mod.ts";

const v = new FastestValidator();
const check = v.compile({
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
        props: parishSelectable(1),
      },
    },
  },
});

interface addingParishDetails {
  set: { name: string; geometries: number };
  get: RParish;
}

type AddingParish = (details: addingParishDetails) => Promise<Partial<Parish>>;

export const addingParish: AddingParish = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, geometries },
    get,
  } = details;
  const createdParish = await parishes.insertOne({
    name,
    geometries,
  });
  const ob = new Bson.ObjectID(createdParish);
  return get ? getParish({ _id: ob, get }) : { _id: ob };
};
