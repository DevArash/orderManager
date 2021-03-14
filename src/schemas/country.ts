import db from "../../db.ts";
import { Parish } from "./parish.ts";
import { Base, fieldType, RType } from "./utils/mod.ts";
import { PuCity, citySelectable, RCity } from "./city.ts";
import { PuState, stateSelectable, RState } from "./state.ts";

export interface PuCountry extends Base {
  name: string;
  abbr: string;
  logo: string;
}

export interface EmCountry {
  states: PuState[];
  cities: PuCity[];
}

export interface InCountry {
  state: PuState;
}

export interface OutCountry {
  parishes: Parish[];
}

export interface Country extends EmCountry, PuCountry {}

export interface RCountry {
  _id: RType;
  name: RType;
  abbr: RType;
  logo: RType;
  states: RState;
  cities: RCity;
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
      }
    : returnObj;
};

export const countries = db.collection<Country>("Countries");
