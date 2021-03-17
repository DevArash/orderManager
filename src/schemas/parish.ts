import db from "../../db.ts";
import {
  Base,
  fieldType,
  RType,
  PuCity,
  citySelectable,
  RCity,
  PuState,
  stateSelectable,
  RState,
  PuCountry,
  countrySelectable,
  RCountry,
  PuUser,
  RUser,
  userSelectable,
  PuCenter,
  RCenter,
  centerSelectable,
} from "./mod.ts";

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

export interface OutRelParish {
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
