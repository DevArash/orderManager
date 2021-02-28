import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { Bson } from "../../../db.ts";
import {
  centers,
  centerSelectable,
  Center,
  RCenter,
  ActiveHours,
  Certificate,
} from "../../schemas/center.ts";
import { throwError } from "../../utils/throwError.ts";
import { getCenter } from "./funcs/getCenter.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          owner: {
            type: "object",
            props: {
              name: { type: "string" },
              phone: { type: "number" },
            },
          },
          address: {
            type: "object",
            props: {
              state: { type: "string" },
              city: { type: "string" },
              mainStreet: { type: "string" },
              houseNumber: { type: "number" },
              postalCode: { type: "number" },
            },
          },
          phone: { type: "number" },
          certificate: {
            type: "object",
            props: {
              title: { type: "string" },
              issuedAt: { type: "string" },
              expiryDate: { type: "string" },
              issuedBy: { type: "string" },
            },
          },
          activeHours: {
            type: "object",
            props: {
              title: { type: "string" },
              open: { type: "string" },
              close: { type: "string" },
            },
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
});

interface addingCenterDetails {
  set: {
    name: string;
    owner: {
      name: string;
      phone: number;
    };
    address: {
      state: string;
      city: string;
      mainStreet: string;
      houseNumber: number;
      postalCode: number;
    };
    phone: number;
    certificate: Certificate[];
    activeHours: ActiveHours[];
  };
  get: RCenter;
}

type AddingCenter = (details: addingCenterDetails) => Promise<Partial<Center>>;

export const addingCenter: AddingCenter = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, owner, address, phone, certificate, activeHours },
    get,
  } = details;
  const createdCenter = await centers.insertOne({
    name,
    owner,
    address,
    phone,
    certificate,
    activeHours,
  });
  console.log(createdCenter);
  const ob = new Bson.ObjectID(createdCenter);
  return get ? getCenter({ _id: ob, get }) : { _id: ob };
};
