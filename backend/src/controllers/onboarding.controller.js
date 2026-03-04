import prisma from "../config/prisma.js";
import { generateDeductions } from "../services/deductionEngine.service.js";

export const handleOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = req.body;
    const year = new Date().getFullYear();

    await prisma.user.update({
      where: { user_id: userId },
      data: {
        income_channel: profile.incomeChannel || null,
      },
    });

    await prisma.userDeduction.deleteMany({
      where: {
        user_id: userId,
        tax_year: year,
      },
    });

    const deductions = generateDeductions(profile, year);

    if (deductions.length > 0) {
      await prisma.userDeduction.createMany({
        data: deductions.map((d) => ({
          user_id: userId,
          deduction_id: d.deduction_id,
          tax_year: d.tax_year,
          amount_claimed: d.amount_claimed,
        })),
      });
    }

    res.json({
      success: true,
      message: "Onboarding completed successfully",
    });

  } catch (err) {
    console.error("Onboarding error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to complete onboarding",
    });
  }
};