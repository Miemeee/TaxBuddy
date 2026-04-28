import { useEffect, useState, useCallback } from "react";
import { dashboardService } from "../services/dashboardService";

export const useDashboard = () => {

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    taxExpense: 0,
    incomeAfterExpense: 0,
    taxDeduction: 0,
    taxableIncome: 0,
    taxTotal: 0,
    taxPayable: 0,
  });

  const [history, setHistory] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await dashboardService.getDashboard();

      const s = data?.summary || {};

      setSummary({
        totalIncome: s.totalIncome ?? 0,
        totalExpense: s.totalExpense ?? 0,
        taxExpense: s.taxExpense ?? 0,
        incomeAfterExpense: s.incomeAfterExpense ?? 0,
        taxDeduction: s.taxDeduction ?? 0,
        taxableIncome: s.taxableIncome ?? 0,
        taxTotal: s.taxTotal ?? 0,
        taxPayable: s.taxPayable ?? 0,
      });

      const mappedHistory = (data?.history || []).map((t) => ({
        id: t.transaction_id,
        transaction_id: t.transaction_id,
        title: t.description || "-",
        category: t.category || "-",
        walletType: t.wallet_type || "-",
        date: t.date,
        amount: t.amount,
        type: t.transaction_type,
      }));
      setHistory(mappedHistory);
      setDeductions(data?.deductions || []);
      setNotifications(data?.notifications || []);

    } catch (err) {
      console.error("DASHBOARD ERROR:", err);
      setError("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    summary,
    history,
    deductions,
    notifications,
    loading,
    error,
    fetchDashboard,
  };
};