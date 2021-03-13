import db from "../../db.ts";
import { Base, fieldType, RType } from "./utils/mod.ts";
import { PuCity, citySelectable, RCity } from "./city.ts";
import { PuState, stateSelectable, RState } from "./state.ts";
import { PuCountry, countrySelectable, RCountry } from "./country.ts";

export interface PuParish extends Base {
  name: string;
}

export interface EmParish {
  city: PuCity;
  state: PuState;
  country: PuCountry;
}

export interface InParish {
  city: PuCity;
  state: PuState;
  country: PuCountry;
}

export interface Parish extends EmParish, PuParish {}

export interface RParish {
  _id: RType;
  name: RType;
  city: RCity;
  state: RState;
  country: RCountry;
}

export const parishSelectable = (depth: number = 4) => {
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
      }
    : returnObj;
};

export const parishes = db.collection<Parish>("Parishes");
