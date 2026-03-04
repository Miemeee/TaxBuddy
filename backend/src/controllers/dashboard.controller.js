import prisma from "../config/prisma.js";
import { calculateByBracket } from "../utils/taxBracket.util.js";

const PERSONAL_ALLOWANCE = 60000; 

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const year = Number(req.query.year);

    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }

    // ดึง transaction ทั้งปี
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
      orderBy: { date: "desc" },
    });

    const totalIncome = transactions
      .filter((t) => t.transaction_type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.transaction_type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // ค่าใช้จ่ายหักเหมา 50% ไม่เกิน 100,000
    const taxExpense = Math.min(totalIncome * 0.5, 100000);

    const incomeAfterExpense = Math.max(
      totalIncome - taxExpense,
      0
    );

    // ค่าลดหย่อนอื่น ๆ จากฐานข้อมูล
    const deductions = await prisma.userDeduction.findMany({
      where: {
        user_id: userId,
        tax_year: year,
      },
      include: {
        deduction: true,
      },
    });

    const userDeductionTotal = deductions.reduce(
      (sum, d) => sum + d.amount_claimed,
      0
    );

    // รวมค่าลดหย่อนส่วนตัวเข้าไป
    const taxDeduction = userDeductionTotal + PERSONAL_ALLOWANCE;

    // รายได้สุทธิที่ต้องเสียภาษี
    const taxableIncome = Math.max(
      incomeAfterExpense - taxDeduction,
      0
    );

    // คำนวณภาษี
    const taxTotal = calculateByBracket(incomeAfterExpense); // ก่อนหักลดหย่อน
    const taxPayable = calculateByBracket(taxableIncome);    // หลังหักลดหย่อน

    // ส่ง Response
    res.json({
      success: true,
      summary: {
        totalIncome,
        totalExpense,

        taxExpense,
        incomeAfterExpense,

        personalAllowance: PERSONAL_ALLOWANCE, 
        taxDeduction, 

        taxableIncome,

        taxTotal,
        taxPayable,
      },
      history: transactions.slice(0, 5),
      deductions,
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false });
  }
};