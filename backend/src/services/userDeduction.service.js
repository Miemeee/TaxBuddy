import prisma from "../config/prisma.js";

export const getByYear = async (userId, year) => {
  if (!year) {
    throw new Error("Year is required");
  }

  return await prisma.userDeduction.findMany({
    where: {
      user_id: userId,
      tax_year: parseInt(year),
    },
    include: {
      deduction: true,
    },
  });
};

export const create = async (userId, data) => {
  if (!data.deduction_id || !data.tax_year || !data.amount_claimed) {
    throw new Error("Missing required fields");
  }

  const deduction = await prisma.deduction.findUnique({
    where: {
      deduction_id: parseInt(data.deduction_id),
    },
  });

  if (!deduction) {
    throw new Error("Deduction not found");
  }

  if (parseFloat(data.amount_claimed) > deduction.max_limit) {
    throw new Error("Amount exceeds max limit");
  }

  return await prisma.userDeduction.create({
    data: {
      user_id: userId,
      deduction_id: parseInt(data.deduction_id),
      tax_year: parseInt(data.tax_year),
      amount_claimed: parseFloat(data.amount_claimed),
    },
  });
};