import prisma from "../config/prisma.js";
import { calculateByBracket, TAX_BRACKETS } from "../utils/taxBracket.util.js";

const PERSONAL_ALLOWANCE = 60000;

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user?.user_id;
    const year = Number(req.query.year);

    if (!year) {
      return res.status(400).json({ 
        success: false, 
        errorCode: "YEAR_REQUIRED" 
      });
    }

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

    // ค่าลดหย่อนอื่นๆ
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

    const taxDeduction = userDeductionTotal + PERSONAL_ALLOWANCE;

    const taxableIncome = Math.max(
      incomeAfterExpense - taxDeduction,
      0
    );

    // คำนวณภาษี
    const taxTotal = calculateByBracket(incomeAfterExpense);
    const taxPayable = calculateByBracket(taxableIncome);

    // Notifications
   const notifications = [];

    for (let i = 0; i < TAX_BRACKETS.length; i++) {
      const bracket = TAX_BRACKETS[i];
      const next = TAX_BRACKETS[i + 1];

      if (taxableIncome > bracket.min && taxableIncome <= bracket.max) {
        if (bracket.rate > 0) {
          notifications.push({
            type: "tax",
            level: "warning",
            errorCode: "NOTI_TAX_BRACKET", 
            params: { rate: bracket.rate }, 
          });
        }

        if (next) {
          const diff = next.min - taxableIncome;
          if (diff > 0 && diff <= 50000) {
            notifications.push({
              type: "tax-tip",
              level: "info",
              errorCode: "NOTI_TAX_BRACKET_TIP",
              params: { 
                amount: diff.toLocaleString(), 
                rate: next.rate 
              },
            });
          }
        }
        break;
      }
    }

    // Deadline Countdown
    const today = new Date();
    const deadline = new Date(); 
    deadline.setDate(deadline.getDate() + 5);

    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 30) {
      notifications.push({
        type: "deadline",
        level: diffDays <= 7 ? "error" : "warning",
        errorCode: diffDays <= 7 ? "NOTI_DEADLINE_URGENT" : "NOTI_DEADLINE_APPROACHING",
        params: { days: diffDays },
      });
    }

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
      notifications, 
      history: transactions.slice(0, 5),
      deductions,
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false, errorCode: "INTERNAL_SERVER_ERROR" });
  }
};