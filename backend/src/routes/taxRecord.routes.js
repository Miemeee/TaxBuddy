import express from "express";
import * as controller from "../controllers/taxRecord.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:year", authMiddleware, controller.create);
router.get("/:year", authMiddleware, controller.get);

export default router;