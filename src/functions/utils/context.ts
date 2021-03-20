import { User } from "./../../schemas/mod.ts";

export interface Context {
  token?: string;
  user?: User;
}
