import express from "express";
import { checkAuth, login, register } from "../controller/auth.controller";
import { handleAsync } from "../utils/catchAsync";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/auth/register").post(
  /**
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/RegisterRequest"}
    } 
   */

  handleAsync(register),
);
router.route("/auth/login").post(
  /**
    #swagger.requestBody = {
      required: true,
      schema: {$ref: "#/components/schemas/LoginRequest"}
    } 
   */

  handleAsync(login),
);
router.route("/auth/logout").post();
router.route("/auth/check-auth").get(
  protectRoute,

  /**
   #swagger.security = [{
    "bearerAuth": []
   }]
   */

  handleAsync(checkAuth),
);

export default router;
