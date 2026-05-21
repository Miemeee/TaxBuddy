import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "../services/token.service.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  if (isTokenBlacklisted(token)) {
    return res.status(401).json({
      success: false,
      message: "Token revoked",
    });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Token is invalid or expired
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}