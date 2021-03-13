import db from "../../../db.ts";
import { Base, fieldType, RType } from "./../utils/mod.ts";
import { PuState, RState, stateSelectable } from "./state.ts";
import { countrySelectable, PuCountry, RCountry } from "./country.ts";

export interface PuCity extends Base {
  name: string;
}

export interface EmCity {
  state: PuState;
  country: PuCountry;
}

export interface InCity {
  state: PuState;
  country: PuCountry;
}

export interface City extends EmCity, PuCity {}

export interface RCity {
  _id: RType;
  name: RType;
  state: RState;
  country: RCountry;
}

export const citySelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    name: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
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
      }
    : returnObj;
};

export const cities = db.collection<City>("Cities");
