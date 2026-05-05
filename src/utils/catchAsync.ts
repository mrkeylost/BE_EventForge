import { NextFunction, Request, Response } from "express";

export const handleAsync = (fn: Function) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error) {
      const err = error as unknown as Error;

      res.json({ message: err.message, data: null });
      next(error);
    }
  };
};
