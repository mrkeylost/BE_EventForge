import { v2 as cloudinary } from "cloudinary";
import "multer";
import { env } from "./env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET,
});

const toDataUrl = (file: Express.Multer.File) => {
  const base64 = Buffer.from(file.buffer).toString("base64");
  const dataUrl = `data:${file.mimetype};base64,${base64}`;

  return dataUrl;
};

const getPublicIdFromFileUrl = (fileUrl: string) => {
  const fileNameUsingSubstring = fileUrl.substring(
    fileUrl.lastIndexOf("/") + 1,
  );

  const publicId = fileNameUsingSubstring.substring(
    0,
    fileNameUsingSubstring.lastIndexOf("."),
  );

  return publicId;
};

export const singleUploader = async (file: Express.Multer.File) => {
  const fileDataUrl = toDataUrl(file);

  const res = await cloudinary.uploader.upload(fileDataUrl, {
    resource_type: "auto",
  });

  return res;
};

export const multipleUploader = async (files: Express.Multer.File[]) => {
  const uploadBatch = files.map((file) => {
    const res = singleUploader(file);

    return res;
  });

  const result = await Promise.all(uploadBatch);

  return result;
};

export const fileRemover = async (fileUrl: string) => {
  const publicId = getPublicIdFromFileUrl(fileUrl);

  const res = await await cloudinary.uploader.destroy(publicId);

  return res;
};
