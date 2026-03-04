import prisma from "../config/prisma.js";
import { calculateByBracket } from "../utils/taxBracket.util.js";

export const calculate = async (userId, year) => {
  if (!year) {
    throw new Error("Year is required");
  }

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

  const totalIncome = transactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );

  const deductions = await prisma.userDeduction.findMany({
    where: {
      user_id: userId,
      tax_year: parseInt(year),
    },
  });

  const totalDeduction = deductions.reduce(
    (sum, d) => sum + d.amount_claimed,
    0
  );

  const netIncome = Math.max(totalIncome - totalDeduction, 0);

  const taxDue = calculateByBracket(netIncome);

  return {
    totalIncome,
    totalDeduction,
    netIncome,
    taxDue,
  };
};