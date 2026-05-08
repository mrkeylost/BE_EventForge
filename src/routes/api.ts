import express from "express";
import {
  activation,
  checkAuth,
  login,
  register,
} from "../controller/auth.controller";
import { handleAsync } from "../utils/catchAsync";
import { protectRoute } from "../middleware/auth.middleware";
import { accessControlList } from "../middleware/access.middleware";
import { ROLES } from "../utils/constant";
import {
  uploadMultipleMiddleware,
  uploadSingleMiddleware,
} from "../middleware/media.middleware";
import {
  removeFile,
  uploadMultipleFile,
  uploadSingleFile,
} from "../controller/media.controller";

const router = express.Router();

//=========================== AUTH ==============================

router.route("/auth/register").post(
  /**
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/RegisterRequest"}
    } 
   */

  handleAsync(register),
);

router.route("/auth/login").post(
  /**
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
    } 
   */

  handleAsync(login),
);

router.route("/auth/check-auth").get(
  protectRoute,

  /**
   #swagger.tags = ['Auth']
   #swagger.security = [{
    "bearerAuth": []
   }]
   */

  handleAsync(checkAuth),
);

router.route("/auth/activation").post(
  /**
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/ActivationRequest"}
    } 
   */

  handleAsync(activation),
);

//===========================MEDIA==============================

router
  .route("/media/upload-single")
  .post(
    [
      protectRoute,
      accessControlList([ROLES.ADMIN, ROLES.MEMBER]),
      uploadSingleMiddleware("file"),
    ],
    handleAsync(uploadSingleFile),
  );

router
  .route("/media/upload-multiple")
  .post(
    [
      protectRoute,
      accessControlList([ROLES.ADMIN, ROLES.MEMBER]),
      uploadMultipleMiddleware("files"),
    ],
    handleAsync(uploadMultipleFile),
  );

router
  .route("/media/remove")
  .delete(
    [protectRoute, accessControlList([ROLES.ADMIN, ROLES.MEMBER])],
    handleAsync(removeFile),
  );

export default router;
