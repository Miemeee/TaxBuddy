import prisma from "../config/prisma.js";
import { calculateByBracket } from "../utils/taxBracket.util.js";


// -----------------------------
// ดึงรายการรายได้ (group ตาม wallet)
// -----------------------------
export const getSimulationIncomes = async (req, res) => {
  try {

    const userId = req.user?.user_id;
    const year = Number(req.query.year);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!year) {
      return res.status(400).json({
        success: false,
        message: "Year is required",
      });
    }

    const incomes = await prisma.transaction.findMany({
      where: {
        user_id: userId,
        transaction_type: "income",
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
      orderBy: { date: "desc" },
    });


    // -----------------------------
    // group ตาม wallet_type
    // -----------------------------
    const grouped = {};

    incomes.forEach((t) => {

      const wallet = t.wallet_type || "Other";

      if (!grouped[wallet]) {
        grouped[wallet] = {
          wallet_type: wallet,
          items: [],
        };
      }

      grouped[wallet].items.push(t);
    });

    res.json({
      success: true,
      data: Object.values(grouped),
    });

  } catch (err) {

    console.error("Simulation incomes error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// -----------------------------
// ดึงรายการค่าลดหย่อน
// -----------------------------
export const getSimulationDeductions = async (req, res) => {
  try {

    const userId = req.user?.user_id;
    const year = Number(req.query.year);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!year) {
      return res.status(400).json({
        success: false,
        message: "Year is required",
      });
    }

    const deductions = await prisma.userDeduction.findMany({
      where: {
        user_id: userId,
        tax_year: year,
      },
      include: {
        deduction: true,
      },
    });


    // -----------------------------
    // group ตาม deduction_name
    // -----------------------------
    const grouped = {};

    deductions.forEach((d) => {

      const name = d.deduction.deduction_name;

      if (!grouped[name]) {
        grouped[name] = {
          deduction_name: name,
          items: [],
        };
      }

      grouped[name].items.push(d);
    });

    res.json({
      success: true,
      data: Object.values(grouped),
    });

  } catch (err) {

    console.error("Simulation deductions error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const calculateSimulation = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const { year, transactionIds, deductionIds } = req.body;

    if (!transactionIds?.length) {
      return res.status(400).json({
        success: false,
        message: "No income selected",
      });
    }

    // -----------------------------
    // รายได้ที่เลือก
    // -----------------------------
    const incomes = await prisma.transaction.findMany({
      where: {
        user_id: userId,
        transaction_id: { in: transactionIds },
      },
    });

    const totalIncome = incomes.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    // -----------------------------
    // หักค่าใช้จ่ายเหมา
    // -----------------------------
    const taxExpense = Math.min(totalIncome * 0.5, 100000);

    const incomeAfterExpense = Math.max(
      totalIncome - taxExpense,
      0
    );

    // -----------------------------
    // ค่าลดหย่อนส่วนตัว
    // -----------------------------
    const PERSONAL_ALLOWANCE = 60000;

    // -----------------------------
    // ดึง deduction ที่เลือก
    // -----------------------------
    let deductionTotal = 0;

    if (deductionIds?.length) {
      const selectedDeductions =
        await prisma.userDeduction.findMany({
          where: {
            user_id: userId,
            user_deduction_id: { in: deductionIds },
          },
        });

      deductionTotal = selectedDeductions.reduce(
        (sum, d) => sum + d.amount_claimed,
        0
      );
    }

    // รวมค่าลดหย่อนทั้งหมด
    const totalDeduction =
      PERSONAL_ALLOWANCE + deductionTotal;

    const taxableIncome = Math.max(
      incomeAfterExpense - totalDeduction,
      0
    );

    const taxTotal = calculateByBracket(
      incomeAfterExpense
    );

    const taxPayable = calculateByBracket(
      taxableIncome
    );

    res.json({
      success: true,
      summary: {
        totalIncome,
        taxExpense,
        incomeAfterExpense,

        personalAllowance: PERSONAL_ALLOWANCE,
        deductionTotal,
        totalDeduction,

        taxableIncome,
        taxTotal,
        taxPayable,
      },
    });
  } catch (err) {
    console.error("Simulation calculate error:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};