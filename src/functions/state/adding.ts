import { Bson } from "../../../db.ts";
import { getState } from "./funcs/mod.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";
import { states, State, stateSelectable, RState } from "../../schemas/state.ts";

const v = new FastestValidator();
const check = v.compile({
  details: {
    type: "object",
    props: {
      set: {
        type: "object",
        props: {
          name: { type: "string" },
          logo: { type: "file" },
        },
      },
      get: {
        type: "object",
        optional: true,
        props: stateSelectable(1),
      },
    },
  },
});

interface addingStateDetails {
  set: { name: string; logo: File };
  get: RState;
}

type AddingState = (details: addingStateDetails) => Promise<Partial<State>>;

export const addingState: AddingState = async (details) => {
  const detailsIsRight = check({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { name, logo },
    get,
  } = details;
  const createdState = await states.insertOne({
    name,
    logo,
  });
  const ob = new Bson.ObjectID(createdState);
  return get ? getState({ _id: ob, get }) : { _id: ob };
};
