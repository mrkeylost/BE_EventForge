import express from "express";
import { handleDummy } from "../controller/dummy.controller";

const router = express.Router();

router.route("/dummy").get(handleDummy);

export default router;
