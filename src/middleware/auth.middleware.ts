import { NextFunction, Request, Response } from "express";
import { getUserData } from "../utils/jwt";
import { IReqUser } from "../types/auth";

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.json({
      message: "Unauthorized user - No token provided",
      data: null,
    });
  }

  const [prefix, accessToken] = authorization.split(" ");
  if (!(prefix === "Bearer" && accessToken)) {
    return res.json({
      message: "Unauthorized user - No token provided",
      data: null,
    });
  }

  const authUser = getUserData(accessToken);
  if (!authUser) {
    return res.json({
      message: "Unauthorized user - invalid token",
      data: null,
    });
  }

  (req as IReqUser).user = authUser;
  next();
};
