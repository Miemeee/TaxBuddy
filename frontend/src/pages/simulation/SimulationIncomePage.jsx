import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import SimulationHeader from "../../components/simulation/selection/SimulationHeader";
import SelectableGroupList from "../../components/simulation/selection/SelectableGroupList";

import { useSimulationIncome } from "../../hooks/useSimulationIncome";
import { useSimulationDeduction } from "../../hooks/useSimulationDeduction";
import { useSimulationContext } from "../../context/SimulationContext";

export default function SimulationIncomePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { groups } = useSimulationIncome();
    const { groups: deductionGroups } = useSimulationDeduction();

    const {
        selectedIncomeIds,
        toggleIncome,
    } = useSimulationContext();

    const [error, setError] = useState("");

    const hasDeductionItems = deductionGroups?.some(
        g => g.items?.length > 0
    );

    const handleNext = () => {
        if (!selectedIncomeIds || selectedIncomeIds.length === 0) {
            setError(t("simulation.selectAtLeastOne"));
            return;
        }

        setError("");

        if (hasDeductionItems) {
            navigate("/simulation/deductions");
        } else {
            navigate("/simulation/result");
        }
    };

    return (
        <Box sx={{ p: 3 }}>

            <SimulationHeader step="income" />

            <SelectableGroupList
                groups={groups}
                selectedIds={selectedIncomeIds}
                toggleSelect={toggleIncome}
            />
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleNext}
            >
                {t("simulation.next")}
            </Button>

        </Box>
    );
}