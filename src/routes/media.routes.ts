import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { accessControlList } from "../middleware/access.middleware";
import { ROLES } from "../utils/constant";
import {
  uploadMultipleMiddleware,
  uploadSingleMiddleware,
} from "../middleware/media.middleware";
import { handleAsync } from "../utils/catchAsync";
import {
  removeFile,
  uploadMultipleFile,
  uploadSingleFile,
} from "../controller/media.controller";

const router = express.Router();

router.route("/upload-single").post(
  [
    protectRoute,
    accessControlList([ROLES.ADMIN, ROLES.MEMBER]),
    uploadSingleMiddleware("file"),
  ],
  handleAsync(
    /**
    #swagger.path = '/media/upload-single'
    #swagger.tags = ['Media']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/UploadSingleRequest"}
    } 
   */

    uploadSingleFile,
  ),
);

router.route("/upload-multiple").post(
  [
    protectRoute,
    accessControlList([ROLES.ADMIN, ROLES.MEMBER]),
    uploadMultipleMiddleware("files"),
  ],
  handleAsync(
    /**
    #swagger.path = '/media/upload-multiple'
    #swagger.tags = ['Media']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/UploadMultipleRequest"}
    } 
   */

    uploadMultipleFile,
  ),
);

router.route("/remove").delete(
  [protectRoute, accessControlList([ROLES.ADMIN, ROLES.MEMBER])],
  handleAsync(
    /**
    #swagger.path = '/media/upload-single'
    #swagger.tags = ['Media']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/RemoveMediaRequest"}
    } 
   */

    removeFile,
  ),
);

export default router;
