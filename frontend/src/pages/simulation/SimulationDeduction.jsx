import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SimulationHeader from "../../components/simulation/selection/SimulationHeader";
import SelectableGroupList from "../../components/simulation/selection/SelectableGroupList";

import { useSimulationDeduction } from "../../hooks/useSimulationDeduction";
import { useSimulationContext } from "../../context/SimulationContext";

export default function SimulationDeductionPage() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { groups } = useSimulationDeduction();

    const {
        selectedDeductionIds,
        toggleDeduction,
    } = useSimulationContext();

    return (
        <Box sx={{ p: 3 }}>

            <SimulationHeader step="deduction" />

            <SelectableGroupList
                groups={groups}
                selectedIds={selectedDeductionIds}
                toggleSelect={toggleDeduction}
                showChildToggle={false}
            />

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 4 }}
                onClick={() => navigate("/simulation/result")}
            >
                {t("simulation.taxResult")}
            </Button>

        </Box>
    );
}