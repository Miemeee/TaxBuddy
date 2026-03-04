import express from "express";
import * as controller from "../controllers/userDeduction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, controller.create);
router.get("/", authMiddleware, controller.getByYear);

export default router;