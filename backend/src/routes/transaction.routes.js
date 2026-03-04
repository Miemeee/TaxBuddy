import express from "express";
import * as controller from "../controllers/transaction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, controller.getByYear);
router.post("/", authMiddleware, controller.create);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.remove);


export default router;