import { useState, useEffect } from "react";
import { transactionService } from "../services/transactionService";

export const useTransaction = (type) => {

  const [history, setHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loadData = async () => {
    try {

      const year = selectedDate.getFullYear();
      const res = await transactionService.getByYear(year);

      const list = Array.isArray(res) ? res : res?.data || [];

      const filtered = list.filter(
        (item) =>
          item.transaction_type?.toLowerCase() ===
          type?.toLowerCase()
      );

      setHistory(filtered);

    } catch (err) {
      console.error("Failed to load transactions", err);
      setHistory([]);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedDate, type]);

  return {
    history,
    selectedDate,
    setSelectedDate,
    reload: loadData,
  };
};