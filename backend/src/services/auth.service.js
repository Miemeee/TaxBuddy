import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

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

export const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password_hash
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

const hasOnboarded = user.has_onboarded;

  const token = jwt.sign(
    { user_id: user.user_id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    hasOnboarded,
  };
};