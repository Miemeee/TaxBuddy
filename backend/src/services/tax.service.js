import prisma from "../config/prisma.js";
import { calculateByBracket } from "../utils/taxBracket.util.js";

/**
 * @param {Number} userId - User ID
 * @param {Number} year - Tax year 
 * @returns {Object} { totalIncome, totalDeduction, netIncome, taxDue }
 * @throws {Error} If year is not provided
 */
export const calculate = async (userId, year) => {
  if (!year) {
    throw new Error("Year is required");
  }

  // Fetch income 
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: userId,
      transaction_type: "income",
      date: {
        gte: new Date(`${year}-01-01`),
        lte: new Date(`${year}-12-31`),
      },
    },
  });

  // Calculate total
  const totalIncome = transactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  // Fetch deductions
  const deductions = await prisma.userDeduction.findMany({
    where: {
      user_id: userId,
      tax_year: parseInt(year),
    },
  });

  // Calculate total
  const totalDeduction = deductions.reduce(
    (sum, d) => sum + d.amount_claimed,
    0
  );

  // net income (income - deductions, minimum 0)
  const netIncome = Math.max(totalIncome - totalDeduction, 0);

  // tax
  const taxDue = calculateByBracket(netIncome);

  return {
    totalIncome,
    totalDeduction,
    netIncome,
    taxDue,
  };
};