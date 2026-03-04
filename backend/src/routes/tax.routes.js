import express from "express";
import * as controller from "../controllers/tax.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/calculate", authMiddleware, controller.calculate);

export default router;