// src/components/SimulationButton.jsx
import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const SimulationButton = () => {
    const { t } = useTranslation();
    return (
        <Button
            fullWidth
            variant="contained"
            sx={{
                mt: 2,
                borderRadius: 1.5,
                py: 1.5,
            }}
        >
            {t("dashboard.simulationButton")}
        </Button>
    );
};

export default SimulationButton;