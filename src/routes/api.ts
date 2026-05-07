import express from "express";
import {
  activation,
  checkAuth,
  login,
  register,
} from "../controller/auth.controller";
import { handleAsync } from "../utils/catchAsync";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

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

export default router;
