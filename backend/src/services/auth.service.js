import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { blacklistToken } from "./token.service.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const register = async (data) => {
  // Check already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  // Hash password bcrypt
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password_hash: hashedPassword,
      allow_notifications: true,
    },
  });

  return user;
};

/**
 * @param {Object} data - Login (email, password)
 * @returns {Object} JWT token and onboarding status
 * @throws {Error} If credentials are invalid
 */
export const login = async (data) => {
  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  // Check if exists and has password
  if (!user || !user.password_hash) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Compare password
  const isMatch = await bcrypt.compare(
    data.password,
    user.password_hash
  );

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // Gen JWT token
  const token = jwt.sign(
    { user_id: user.user_id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    hasOnboarded: user.has_onboarded,
  };
};

export const logout = async (token) => {
  if (!token) {
    throw new Error("NO_TOKEN_PROVIDED");
  }

  blacklistToken(token);
};

/**
 * @param {String} googleToken - Google ID token from frontend
 * @returns {Object} JWT token and onboarding status
 * @throws {Error} If token verification fails
 */
export const googleLogin = async (googleToken) => {
  // Verify Google token and extract payload
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const email = payload.email;
  const name = payload.name;

  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // If new user, create account
  if (!user) {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: null,
        allow_notifications: true,
      },
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { user_id: user.user_id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    hasOnboarded: user.has_onboarded,
  };
};