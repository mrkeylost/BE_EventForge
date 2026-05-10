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

router.route("/register").post(
  /**
    #swagger.path = '/auth/login'
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/RegisterRequest"}
    } 
   */

  handleAsync(register),
);

router.route("/login").post(
  /**
    #swagger.path = '/auth/register'
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
    } 
   */

  handleAsync(login),
);

router.route("/check-auth").get(
  protectRoute,

  /*
   #swagger.path = '/auth/check-auth'
   #swagger.tags = ['Auth']
   #swagger.security = [{
    "bearerAuth": []
   }]
   */

  handleAsync(checkAuth),
);

router.route("/activation").post(
  /**
    #swagger.path = '/auth/activation'
    #swagger.tags = ['Auth']
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/ActivationRequest"}
    } 
   */

  handleAsync(activation),
);

export default router;
