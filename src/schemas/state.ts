import db from "../../db.ts";
import { RCity, citySelectable, PuCity } from "./city.ts";
import { Base, fieldType, RType } from "./utils/mod.ts";
import { PuCountry, RCountry, countrySelectable } from "./country.ts";

export interface PuState extends Base {
  name: string;
  logo: File;
}

export interface EmState {
  country: PuCountry;
  cities: PuCity[];
}

export interface InState {
  country: PuCountry;
  cities: PuCity[];
}

export interface State extends PuState, EmState {}

export interface RState {
  _id: RType;
  name: RType;
  logo: RType;
  countries?: RCountry;
  cities?: RCity;
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
      }
    : returnObj;
};

export const states = db.collection<State>("States");
