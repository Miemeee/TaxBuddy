import { useEffect, useState } from "react";
import { simulationService } from "../services/simulationService";

/**
 * Fetches incomes
 * @param {Number} year - Tax year
 * @returns {Object} { groups, selectedIds, toggleSelect, loading, error }
 */
export function useSimulation(year) {
  const [groups, setGroups] = useState([]);        // Grouped income data
  const [selectedIds, setSelectedIds] = useState([]); // Selected income ID

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch incomes whenever year changes
  useEffect(() => {
    if (!year) return;

    const load = async () => {
      try {
        setLoading(true);

        // Fetch income data from API
        const data = await simulationService.getIncomes(year);

        // Transform raw data
        const mapped = data.map((t) => ({
          id: t.transaction_id,
          title: t.description || t.wallet_type || "รายได้",
          date: t.date,
          amount: Number(t.amount),
          type: t.wallet_type || "other",
        }));

        // Group incomes
        const groupMap = {};

        mapped.forEach((item) => {
          if (!groupMap[item.type]) {
            groupMap[item.type] = [];
          }
          groupMap[item.type].push(item);
        });

        // Convert grouped map
        const grouped = Object.keys(groupMap).map((type) => ({
          type,
          items: groupMap[type],
          total: groupMap[type].reduce(
            (sum, i) => sum + i.amount,
            0
          ),
        }));

        setGroups(grouped);

        // select all incomes
        setSelectedIds(mapped.map((i) => i.id));

      } catch (err) {
        console.error(err);
        setError("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [year]);

  /**
   * Toggle income selection
   * @param {Number} id - Income ID
   */
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return {
    groups,          
    selectedIds,    
    toggleSelect,  
    loading,        
    error,         
  };
}