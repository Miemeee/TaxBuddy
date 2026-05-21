import prisma from "../config/prisma.js";

/**
 * @param {Number} userId - User ID
 * @param {Number} year - Tax year
 * @returns {Array} User deduction
 * @throws {Error} If year is not provided
 */
export const getByYear = async (userId, year) => {
  if (!year) {
    throw new Error("Year is required");
  }

  // Fetch deductions
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

/**
 * @param {Number} userId - User ID
 * @param {Object} data - {deduction_id, tax_year, amount_claimed}
 * @returns {Object} Created user deduction record
 * @throws {Error} If deduction not found or amount exceeds limit
 */
export const create = async (userId, data) => {
  // Validate required fields
  if (!data.deduction_id || !data.tax_year || !data.amount_claimed) {
    throw new Error("Missing required fields");
  }

  // Check deduction
  const deduction = await prisma.deduction.findUnique({
    where: {
      deduction_id: parseInt(data.deduction_id),
    },
  });

  if (!deduction) {
    throw new Error("Deduction not found");
  }

  // Verify claimed amount max
  if (parseFloat(data.amount_claimed) > deduction.max_limit) {
    throw new Error("Amount exceeds max limit");
  }

  // Create record
  return await prisma.userDeduction.create({
    data: {
      user_id: userId,
      deduction_id: parseInt(data.deduction_id),
      tax_year: parseInt(data.tax_year),
      amount_claimed: parseFloat(data.amount_claimed),
    },
  });
};