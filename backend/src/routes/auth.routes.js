import express from "express";
import * as controller from "../controllers/auth.controller.js";

import validate from "../middleware/validate.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = express.Router();

/**
 * POST /auth/register
 * @body { name, email, password }
 * @returns { success, data: { user_id, name, email } } (201 Created)
 */
router.post(
  "/register",
  validate(registerSchema),        // Validate request body
  controller.register
);

/**
 * POST /auth/login
 * Login with email and password
 * @body { email, password }
 * @returns { success, data: { token, hasOnboarded } } (200 OK)
 */
router.post("/login", controller.login);

/**
 * POST /auth/google
 * Login or register with Google OAuth
 * @body { token: googleIdToken }
 * @returns { success, data: { token, hasOnboarded } } (200 OK)
 */
router.post("/google", controller.googleLogin);

/**
 * POST /auth/logout
 * Logout user and revoke token
 * @headers Authorization: Bearer token
 * @returns { success, message } (200 OK)
 */
router.post("/logout", authMiddleware, controller.logout);

export default router;
