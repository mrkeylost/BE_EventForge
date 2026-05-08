import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

export const uploadSingleMiddleware = (fieldName: string) => {
  return upload.single(fieldName);
};

export const uploadMultipleMiddleware = (fieldName: string) => {
  return upload.array(fieldName);
};
