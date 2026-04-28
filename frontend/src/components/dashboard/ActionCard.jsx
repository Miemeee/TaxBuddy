// components/dashboard/ActionCard.jsx

import React from "react";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

function ActionCard({ type }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();

    const isIncome = type === "income";

    const handleClick = () => {
        navigate(isIncome ? "/income" : "/expense");
    };

    return (
        <Card
            onClick={handleClick}
            sx={{
                width: "100%",
                p: 4,
                textAlign: "center",
                backgroundColor: isIncome
                    ? theme.palette.success.main
                    : theme.palette.error.main,
                color: theme.palette.common.white,
                borderRadius: 2,
                cursor: "pointer",
                transition: "0.2s",
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 4,
                },
            }}
        >
            <Typography fontWeight={600}>
                {isIncome ? t("dashboard.income") : t("dashboard.expense")}
            </Typography>
        </Card>
    );
}

export default ActionCard;