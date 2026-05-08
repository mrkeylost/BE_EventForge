import { NextFunction, Request, Response } from "express";
import response from "./response";

export const handleAsync = (fn: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error) {
      const err = error as unknown as Error;

      response.error(res, err, err.message);
      next(error);
    }
  };
};
