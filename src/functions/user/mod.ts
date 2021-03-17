import { login } from "./login.ts";
import { signing } from "./signing.ts";
import { User } from "../../schemas/mod.ts";
import { throwError } from "../../utils/mod.ts";
import FastestValidator from "https://cdn.pika.dev/fastest-validator@^1.8.0";

const v = new FastestValidator();
const check = v.compile({
  doit: {
    type: "enum",
    values: ["signing", "login"],
  },
});

export type UserDoit = "signing" | "login";

type UserFns = (doit: UserDoit, details: any) => Promise<Partial<User>>;

export const userFns: UserFns = (doit, details) => {
  const checkDoit = check({ doit });
  return checkDoit === true
    ? {
        ["signing"]: async () => await signing(details),
        ["login"]: async () => await login(details),
      }[doit]()
    : throwError(checkDoit[0].message);
};
