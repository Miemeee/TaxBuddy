import { useEffect, useState } from "react";
import { simulationService } from "../services/simulationService";

export function useSimulation(year) {
  const [groups, setGroups] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!year) return;

    const load = async () => {
      try {
        setLoading(true);

        const data = await simulationService.getIncomes(year);

        const mapped = data.map((t) => ({
          id: t.transaction_id,
          title: t.description || t.wallet_type || "รายได้",
          date: t.date,
          amount: Number(t.amount),
          type: t.wallet_type || "other",
        }));

        // 🔥 group by type
        const groupMap = {};

        mapped.forEach((item) => {
          if (!groupMap[item.type]) {
            groupMap[item.type] = [];
          }
          groupMap[item.type].push(item);
        });

        const grouped = Object.keys(groupMap).map((type) => ({
          type,
          items: groupMap[type],
          total: groupMap[type].reduce(
            (sum, i) => sum + i.amount,
            0
          ),
        }));

        setGroups(grouped);

        // default select all
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