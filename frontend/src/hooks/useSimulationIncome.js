import { useState, useEffect } from "react";
import { simulationService } from "../services/simulationService";
import { Description } from "@mui/icons-material";

export function useSimulationIncome() {

  const [groups, setGroups] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    loadIncomes();
  }, []);

  const loadIncomes = async () => {
    try {

      const data = await simulationService.getIncomes(year);

      const mapped = data.map((group) => ({
        type: group.wallet_type,
        items: group.items.map((t) => ({
          id: t.transaction_id,
          title:  group.wallet_type,
          description: t.description ,
          amount: t.amount,
          date: t.date,
        })),
      }));

      setGroups(mapped);

    } catch (err) {
      console.error("Load income error", err);
    }
  };

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
  };
}