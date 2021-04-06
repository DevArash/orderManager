import { getUser } from "../mod.ts";
import { Bson } from "../../../db.ts";
import { throwError } from "../../utils/mod.ts";
import { Context } from "../utils/context.ts";
import {
  users,
  countries,
  states,
  cities,
  parishes,
} from "./../../schemas/mod.ts";
import { checkDeleteUser, DeleteUserDetails } from "./deleteUser.type.ts";

type DeleteUser = (details: DeleteUserDetails, context?: Context) => any;

const deleteUser = async (_id: Bson.ObjectID) => {
  const deletedUser = await users.findOne({
    _id,
  });

  // step1: delete the Address of this User,
  const a = await countries.deleteMany({
    "user._id": deletedUser!._id,
  });
  const b = await states.deleteMany({
    "user._id": deletedUser!._id,
  });
  const c = await cities.deleteMany({
    "user._id": deletedUser!._id,
  });
  const d = await parishes.deleteMany({
    "user._id": deletedUser!._id,
  });

  //step 2: delete the User itself
  await users.deleteOne({ _id });
  return deletedUser;
};

/**
 * @function
 * @param details
 * @param context
 */
export const deleteUserFn: DeleteUser = async (details, context) => {
  const detailsIsRight = checkDeleteUser({ details });
  detailsIsRight !== true && throwError(detailsIsRight[0].message);
  const {
    set: { _id },
    get: {},
  } = details;
  const objId = new Bson.ObjectID(_id);
  return deleteUser(objId);
};
