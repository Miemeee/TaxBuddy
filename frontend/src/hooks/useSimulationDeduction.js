import { useState, useEffect } from "react";
import { simulationService } from "../services/simulationService";

export function useSimulationDeduction() {

  const [groups, setGroups] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    loadDeductions();
  }, []);

  const loadDeductions = async () => {
    try {

      const data = await simulationService.getDeductions(year);

      const mapped = data.map((group) => ({
        deduction_id: group.deduction_id,
        items: group.items.map((d) => ({
          id: d.id,
          amount: d.amount,
        })),
      }));

      setGroups(mapped);

    } catch (err) {
      console.error("Load deduction error", err);
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