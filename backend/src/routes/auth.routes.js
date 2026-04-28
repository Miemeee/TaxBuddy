import express from "express";
import * as controller from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  controller.register
);

router.post("/login", controller.login);
router.post("/google", controller.googleLogin);

export default router;