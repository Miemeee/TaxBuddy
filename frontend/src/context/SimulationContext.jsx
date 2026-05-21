import { createContext, useContext, useState } from "react";

const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {

    const [selectedIncomeIds, setSelectedIncomeIds] = useState([]);     
    const [selectedDeductionIds, setSelectedDeductionIds] = useState([]);

    /**
     * @param {Number} id - Income ID to toggle
     */
    const toggleIncome = (id) => {
        setSelectedIncomeIds((prev) =>
            // If already selected remove otherwise add 
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    /**
     * @param {Number} id - Deduction ID to toggle
     */
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

/**
 * @throws {Error} If used outside SimulationProvider
 * @returns {Object} Simulation context value
 */
export const useSimulationContext = () => {
    const context = useContext(SimulationContext);

    if (!context) {
        throw new Error(
            "useSimulationContext must be used inside SimulationProvider"
        );
    }

    return context;
};