import { Bson } from "../../../../db.ts";
import { RUser, User, users } from "../../../schemas/user.ts";
import { makeProjections } from "../../../utils/makeProjections.ts";

type GetUsersInput = { filter: Bson.Document; getObj: RUser };
type GetUsersFn = ({ filter, getObj }: GetUsersInput) => Promise<User[]>;
export const getUsers: GetUsersFn = async ({ filter, getObj }) => {
  const projection = makeProjections(getObj, [], []);

  const foundedUsers = await users.find(filter, { projection });
  let returnUsers = await foundedUsers.toArray();

  return returnUsers;
};
