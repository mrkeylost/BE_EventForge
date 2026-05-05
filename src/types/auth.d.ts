import { Types } from "mongoose";
import { Request } from "express";

export type TRegister = {
  fullName: String;
  username: String;
  email: String;
  password: String;
  confirmPassword: String;
};

export type TLogin = {
  identifier: string;
  password: string;
};

export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
}

export interface IUserToken extends Omit<
  User,
  | "fullName"
  | "username"
  | "email"
  | "password"
  | "profilePicture"
  | "isActive"
  | "activationCode"
> {
  id?: Types.ObjectId;
}

export interface IReqUser extends Request {
  user?: IUserToken;
}
