import express from "express";
import { handleOnboarding } from "../controllers/onBoarding.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, handleOnboarding);

export default router;