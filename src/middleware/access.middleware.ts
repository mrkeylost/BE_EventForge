import { NextFunction, Response } from "express";
import { IReqUser } from "../types/auth";
import response from "../utils/response";

export const accessControlList = (roles: string[]) => {
  return (req: IReqUser, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !roles.includes(role))
      return response.unauthorized(res, "Forbidden Access");

    next();
  };
};
