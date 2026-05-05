import express from "express";
import { checkAuth, login, register } from "../controller/auth.controller";
import { handleAsync } from "../utils/catchAsync";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/auth/register").post(handleAsync(register));
router.route("/auth/login").post(handleAsync(login));
router.route("/auth/logout").post();
router.route("/auth/check-auth").get(protectRoute, handleAsync(checkAuth));

export default router;
