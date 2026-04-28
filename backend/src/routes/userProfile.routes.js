// routes/userRoutes.js

import express from "express";
import {
  getProfile,
  updateProfile,
  updateIncomeChannels,
  updateDeductions,
} from "../controllers/userProfile.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.patch("/profile", authMiddleware, updateProfile);

router.put("/income-channels", authMiddleware, updateIncomeChannels);

router.put("/deductions", authMiddleware, updateDeductions);

export default router;