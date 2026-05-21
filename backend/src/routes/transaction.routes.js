import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import * as controller from "../controllers/transaction.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const uploadDirectory = path.join(process.cwd(), "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${timestamp}-${safeName}`);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", authMiddleware, controller.getByYear);
router.post("/", authMiddleware, upload.single("file"), controller.create);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.remove);

export default router;