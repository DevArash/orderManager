import db from "../../db.ts";
import { RCity, citySelectable, PuCity } from "./city.ts";
import { Base, fieldType, RType } from "./utils/mod.ts";
import { PuCountry, RCountry, countrySelectable } from "./country.ts";
import { PuCenter, RCenter, centerSelectable } from "./center.ts";
import { PuUser, RUser, userSelectable } from "./user.ts";

export interface PuState extends Base {
  name: string;
  logo: string;
  geometries: {
    type: "polygon";
    cordinate: [number, number][];
  };
}

export interface EmState {
  country: PuCountry;
  cities: PuCity[];
}

export interface InRelState {
  country: PuCountry;
  cities: PuCity[];
}

export interface OutRelCity {
  center: PuCenter;
  user: PuUser;
}

export interface State extends PuState, EmState {}

export interface RState {
  _id: RType;
  name: RType;
  logo: RType;
  countries?: RCountry;
  cities?: RCity;
  centers: RCenter;
  users: RUser;
}

export const stateSelectable: any = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    name: fieldType,
    logo: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        cities: {
          type: "object",
          optional: true,
          props: citySelectable(depth),
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

export const states = db.collection<State>("States");
