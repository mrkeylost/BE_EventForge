import { Request, Response } from "express";

export const handleDummy = (req: Request, res: Response) => {
  res.status(200).json({ message: "Dummy Success", data: "OK" });
};
