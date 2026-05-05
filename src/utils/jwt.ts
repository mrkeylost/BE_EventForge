import jwt from "jsonwebtoken";
import { IUserToken } from "../types/auth";
import { env } from "./env";

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, env.SECRET, {
    expiresIn: "7d",
  });

  return token;
};

export const getUserData = (token: string) => {
  const user = jwt.verify(token, env.SECRET) as IUserToken;

  return user;
};
