import db from "../../db.ts";
import { Base, fieldType, RType } from "./utils/mod.ts";
import { PuCity, citySelectable, RCity } from "./city.ts";
import { PuState, stateSelectable, RState } from "./state.ts";
import { PuCountry, countrySelectable, RCountry } from "./country.ts";
import { PuUser, RUser, userSelectable } from "./user.ts";
import { PuCenter, RCenter, centerSelectable } from "./center.ts";

export interface PuParish extends Base {
  name: string;
  geometries: {
    type: "polygon";
    cordinate: [number, number][];
  };
}

export interface EmParish {
  city: PuCity;
  state: PuState;
  country: PuCountry;
}

export interface InRelParish {}

export interface OutRelCity {
  center: PuCenter;
  user: PuUser;
}

export interface Parish extends EmParish, PuParish {}

export interface RParish {
  _id: RType;
  name: RType;
  city: RCity;
  state: RState;
  country: RCountry;
  centers: RCenter;
  users: RUser;
}

export const parishSelectable: any = (depth: number = 4) => {
  depth--;
  const returnObj = {
    name: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        city: {
          type: "object",
          optional: true,
          props: citySelectable(depth),
        },
        state: {
          type: "object",
          optional: true,
          props: stateSelectable(depth),
        },
        country: {
          type: "object",
          optional: true,
          props: countrySelectable(depth),
        },
        center: {
          type: "object",
          optional: true,
          props: centerSelectable(depth),
        },
        user: {
          type: "object",
          optional: true,
          props: userSelectable(depth),
        },
      }
    : returnObj;
};

export const parishes = db.collection<Parish>("Parishes");
