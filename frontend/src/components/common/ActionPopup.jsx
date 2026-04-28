import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ActionCard from "../dashboard/ActionCard";
import { useTranslation } from "react-i18next";

function ActionPopup({ onClose }) {
    const { t } = useTranslation();

    return (
        <Card
            sx={{
                width: 420,
                p: 3,
                borderRadius: 4,
            }}
        >
            {/* header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <IconButton onClick={onClose}>
                    <ArrowBackIosNewRoundedIcon />
                </IconButton>

                <Typography sx={{ flex: 1 }} textAlign="center">
                    {t("dashboard.selectRecord")}
                </Typography>
            </Box>

            {/* buttons */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                }}
            >
                <ActionCard type="income" />
                <ActionCard type="expense" />
            </Box>
        </Card>
    );
}

export default ActionPopup;