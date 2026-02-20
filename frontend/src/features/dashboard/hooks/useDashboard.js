// src/pages/hooks/useDashboard.js

import { useEffect, useState, useCallback } from "react";
import { dashboardService } from "../services/dashboardService";

export const useDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    let isMounted = true;

    try {
      setLoading(true);
      setError(null);

      const [summaryData, historyData, recommendedData] =
        await Promise.all([
          dashboardService.getSummary(),
          dashboardService.getHistory(),
          dashboardService.getRecommended(),
        ]);

      if (!isMounted) return;

      setSummary(summaryData);
      setHistory(historyData);
      setRecommended(recommendedData);

    } catch (err) {
      if (!isMounted) return;
      setError("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      if (isMounted) setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    summary,
    history,
    recommended,
    loading,
    error,
    reload: loadData,
  };
};