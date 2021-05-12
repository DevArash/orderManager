import FastestValidator from "https://esm.sh/fastest-validator@1";
import { Bson } from "../../../db.ts";
import {
  centers,
  centerSelectable,
  Center,
  RCenter,
  Certificate,
} from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import { getCenter } from "../mod.ts";

const v = new FastestValidator();
export const schema = {
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          phone: { type: "number", optional: true },
          certificate: {
            type: "object",
            props: {
              title: { type: "string" },
              issuedAt: { type: "any" },
              expiryDate: { type: "any" },
              issuedBy: { type: "string" },
            },
          },
          activeHours: {
            type: "tuple",
            items: ["number", "number", { type: "string", empty: true }],
          },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: centerSelectable(1),
      },
    },
  },
};
const check = v.compile(schema);

interface addingCenterDetails {
  set: {
    name: string;
    phone: number;
    certificate: Certificate[];
    activeHours: [number, number, string?][];
  };
  get: RCenter;
}

type AddingCenter = (details: addingCenterDetails) => Promise<Partial<Center>>;

export const addingCenter: AddingCenter = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, phone, certificate, activeHours },
    get,
  } = details;
  const createdCenter = await centers.insertOne({
    name,
    phone,
    certificate,
    activeHours,
  });
  console.log(createdCenter);
  const ob = new Bson.ObjectID(createdCenter);
  return get ? getCenter({ _id: ob, get }) : { _id: ob };
};
