import { createContext, useContext, useState } from "react";

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {

    const [selectedIncomeIds, setSelectedIncomeIds] = useState([]);
    const [selectedDeductionIds, setSelectedDeductionIds] = useState([]);

    // toggle income
    const toggleIncome = (id) => {
        setSelectedIncomeIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    // toggle deduction
    const toggleDeduction = (id) => {
        setSelectedDeductionIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const value = {
        selectedIncomeIds,
        setSelectedIncomeIds,
        toggleIncome,

        selectedDeductionIds,
        setSelectedDeductionIds,
        toggleDeduction,
    };

    return (
        <SimulationContext.Provider value={value}>
            {children}
        </SimulationContext.Provider>
    );
};

export const useSimulationContext = () => {
    const context = useContext(SimulationContext);

    if (!context) {
        throw new Error(
            "useSimulationContext must be used inside SimulationProvider"
        );
    }

    return context;
};