import { Bson } from "../../../../db.ts";
import { throwError } from "./../../../utils/throwError.ts";
import { RUser, User, users } from "../../../schemas/user.ts";

type GetUserInput = { _id: Bson.ObjectID; get: RUser };
type GetUserFn = ({ _id, get }: GetUserInput) => Promise<User>;

export const getUser: GetUserFn = async ({ _id, get }) => {
  const foundedUser = await users.findOne({ _id });
  const doRelation = async (user: User, get: RUser) => {
    return user;
  };
  return foundedUser
    ? await doRelation(foundedUser, get)
    : throwError("can not find User");
};
