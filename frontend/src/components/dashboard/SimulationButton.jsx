// src/components/SimulationButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SimulationButton = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <Button
            fullWidth
            variant="contained"
            sx={{
                mt: 2,
                borderRadius: 1.5,
                py: 1.5,
            }}
            onClick={() => navigate("/simulation/income")}
        >
            {t("dashboard.simulationButton")}
        </Button>
    );
};

export default SimulationButton;