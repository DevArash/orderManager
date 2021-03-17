import db from "../../db.ts";
import {
  Base,
  fieldType,
  RType,
  PuUser,
  RUser,
  userSelectable,
  PuState,
  RState,
  stateSelectable,
  PuCenter,
  RCenter,
  centerSelectable,
  PuParish,
  RParish,
  parishSelectable,
  countrySelectable,
  PuCountry,
  RCountry,
} from "./mod.ts";
export interface PuCity extends Base {
  name: string;
  geometries: {
    type: "polygon";
    cordinate: [number, number][];
  };
}

export interface EmCity {
  state: PuState;
  country: PuCountry;
}

export interface InRelCity {
  state: PuState;
  country: PuCountry;
}
export interface OutRelCity {
  parish: PuParish;
  center: PuCenter;
  user: PuUser;
}
export interface City extends EmCity, PuCity {}

export interface RCity {
  _id: RType;
  name: RType;
  states: RState;
  parishes: RParish;
  countries: RCountry;
  centers: RCenter;
  users: RUser;
}

export const citySelectable: any = (depth: number = 4) => {
  depth--;
  const returnObj = {
    name: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        parishes: {
          type: "object",
          optional: true,
          props: parishSelectable(depth),
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

export const cities = db.collection<City>("Cities");
