import { NextFunction, Request, Response } from "express";
import { getUserData } from "../utils/jwt";
import { IReqUser } from "../types/auth";
import response from "../utils/response";

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return response.unauthorized(res, "Unauthorized user - No token provided");
  }

  const [prefix, accessToken] = authorization.split(" ");
  if (!(prefix === "Bearer" && accessToken)) {
    return response.unauthorized(res, "Unauthorized user - No token provided");
  }

  const authUser = getUserData(accessToken);
  if (!authUser) {
    return response.unauthorized(res, "Unauthorized user - invalid token");
  }

  (req as IReqUser).user = authUser;
  next();
};
