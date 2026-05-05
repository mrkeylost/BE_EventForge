import * as Yup from "yup";
import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { IReqUser, TLogin, TRegister } from "../types/auth";
import UserModel from "../models/User";
import { generateToken } from "../utils/jwt";

const registerValidationSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Password not match"),
});

export const register = async (req: Request, res: Response) => {
  const { fullName, username, email, password, confirmPassword } =
    req.body as unknown as TRegister;

  await registerValidationSchema.validate({
    fullName,
    username,
    email,
    password,
    confirmPassword,
  });

  const user = new UserModel({ fullName, username, email, password });

  await user.save();

  res.status(200).json({
    message: "Registration Success",
    data: user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body as unknown as TLogin;

  const findUserByIdentifier = await UserModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!findUserByIdentifier) {
    return res.json({ message: "invalid identifier or password", data: null });
  }

  const validatePassword: boolean = await compare(
    password,
    findUserByIdentifier.password,
  );
  if (!validatePassword) {
    return res.json({ message: "invalid identifier or password", data: null });
  }

  const token = generateToken({
    id: findUserByIdentifier._id,
    role: findUserByIdentifier.role,
  });

  return res.json({ message: "Login success", data: token });
};

export const checkAuth = async (req: IReqUser, res: Response) => {
  /**
   #swagger.security = [{
    "bearerAuth": []
   }]
   */

  const authUser = req.user;

  const user = await UserModel.findById(authUser?.id);

  return res.json({ message: "Success", data: user });
};
