import db from "../../db.ts";
import {
  Base,
  fieldType,
  RType,
  City,
  RCity,
  citySelectable,
  State,
  RState,
  stateSelectable,
  Parish,
  parishSelectable,
  Country,
  RCountry,
  countrySelectable,
} from "./mod.ts";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum Level {
  Admin = "Admin",
  Owner = "Owner",
  Operator = "Operator",
  Chef = "Chef",
  Normal = "Normal",
}

export interface PuUser extends Base {
  photo: any;
  name: string;
  family: string;
  phone: number;
  gender: Gender;
  birthDate: Date;
  postalCode: string;
  idNumber: number;
  level: Level[];
  email: string;
  password: string;
  isActive: boolean;
}

export interface EmUser {
  address: {
    country: Country;
    state: State;
    city: City;
    parish: Parish;
  };
}

export interface User extends PuUser, EmUser {}

export interface RUser {
  _id: RType;
  photo: RType;
  name: RType;
  family: RType;
  phone: RType;
  gender: RType;
  birthDate: RType;
  postalCode?: RType;
  idNumber: RType;
  address: {
    country: RCountry;
    state: RState;
    city: RCity;
  };
  level: RType;
  email: RType;
  password: RType;
  isActive: RType;
}

export const userSelectable = (depth: number = 4) => {
  depth--;
  const returnObj = {
    _id: fieldType,
    photo: fieldType,
    name: fieldType,
    family: fieldType,
    phone: fieldType,
    gender: fieldType,
    birthDate: fieldType,
    postalCode: fieldType,
    idNumber: fieldType,
    address: {
      type: "object",
      optional: true,
      props: {
        text: fieldType,
      },
    },
    level: fieldType,
    email: fieldType,
    isActive: fieldType,
  };
  return depth > 0
    ? {
        ...returnObj,
        address: {
          ...returnObj.address,
          props: {
            ...returnObj.address.props,
            country: {
              type: "object",
              optional: true,
              props: countrySelectable(depth),
            },
            state: {
              type: "object",
              optional: true,
              props: stateSelectable(depth),
            },
            city: {
              type: "object",
              optional: true,
              props: citySelectable(depth),
            },
            parish: {
              type: "object",
              optional: true,
              props: parishSelectable(depth),
            },
          },
        },
      }
    : returnObj;
};

export const users = db.collection<User>("Users");
