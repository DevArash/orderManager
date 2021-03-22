import db from "../../db.ts";
import {
  Base,
  fieldType,
  RType,
  Parish,
  PuCity,
  citySelectable,
  RCity,
  PuState,
  stateSelectable,
  RState,
  PuCenter,
  RCenter,
  centerSelectable,
  PuUser,
  RUser,
  userSelectable,
} from "./mod.ts";
export interface PuCountry extends Base {
  name: string;
  abbr: string;
  logo: string;
  geometries: {
    type: "polygon";
    cordinate: [number, number][];
  };
}

export interface EmCountry {
  states: PuState[]; // without inRel
  cities: PuCity[]; //50 most called
}

export interface InRelCountry {
  city: PuCity;
}

export interface OutRelCountry {
  parishes: Parish[];
  center: PuCenter;
  user: PuUser;
}

export interface Country extends EmCountry, PuCountry {}

export interface RCountry {
  _id: RType;
  name: RType;
  abbr: RType;
  logo: RType;
  states: RState;
  cities: RCity;
  centers: RCenter;
  users: RUser;
}

export const countrySelectable: any = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    abbr: fieldType,
    logo: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        states: {
          type: "object",
          optional: true,
          props: stateSelectable(depth),
        },
        cities: {
          type: "object",
          optional: true,
          props: citySelectable(depth),
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

export const countries = db.collection<Country>("Countries");
