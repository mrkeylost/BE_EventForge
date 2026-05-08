import { Response } from "express";
import { IReqUser } from "../types/auth";
import {
  fileRemover,
  multipleUploader,
  singleUploader,
} from "../utils/uploader";
import response from "../utils/response";

export const uploadSingleFile = async (req: IReqUser, res: Response) => {
  if (!req.file) {
    return response.error(res, null, "File not found");
  }

  const file = await singleUploader(req.file as Express.Multer.File);

  return response.success(res, file, "Upload File Success");
};

export const uploadMultipleFile = async (req: IReqUser, res: Response) => {
  if (!req.files || req.files?.length === 0) {
    return response.error(res, null, "File not found");
  }

  const files = await multipleUploader(req.files as Express.Multer.File[]);

  return response.success(res, files, "Upload Files Success");
};

export const removeFile = async (req: IReqUser, res: Response) => {
  const { fileUrl } = req.body as { fileUrl: string };

  const file = await fileRemover(fileUrl);

  return response.success(res, file, "Remove File Success");
};
