import prisma from "../config/prisma.js";
import * as taxService from "./tax.service.js";

export const createRecord = async (userId, year) => {
  if (!year) {
    throw new Error("Year is required");
  }

  // คำนวณภาษี
  const result = await taxService.calculate(userId, year);

  // บันทึก snapshot
  const record = await prisma.taxRecord.create({
    data: {
      user_id: userId,
      tax_year: parseInt(year),
      total_business_income: result.totalIncome,
      total_deductions_claimed: result.totalDeduction,
      net_income: result.netIncome,
      tax_due: result.taxDue,
      status: "calculated",
    },
  });

  return record;
};

export const getByYear = async (userId, year) => {
  if (!year) {
    throw new Error("Year is required");
  }

  return await prisma.taxRecord.findFirst({
    where: {
      user_id: userId,
      tax_year: parseInt(year),
    },
  });
};