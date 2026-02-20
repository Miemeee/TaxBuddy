// src/pages/components/SummaryCard.jsx

import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const formatCurrency = (num = 0) =>
    `${num.toLocaleString("th-TH")} ฿`;

function SummaryCard({ summary, onOpenDetail }) {
    const { t } = useTranslation();
    if (!summary) return null;

    return (
        <Card
            sx={{
                width: "100%",
                height: 350,
                p: 4,
                borderRadius: 4,
                mb: 3,
                backgroundColor: "#F5F5F5",
            }}
        >
            <Box display="flex" alignItems="stretch">
                {/* LEFT SIDE */}
                <Box flex={1}>
                    <Typography
                        fontWeight={600}
                        color="text.secondary"
                        mb={1}
                        fontSize={20}
                    >
                        {t("dashboard.incomeSummaryTitle")}
                    </Typography>

                    <Typography
                        fontSize={33}
                        fontWeight={700}
                        mb={4}
                        textAlign={"right"}
                    >
                        {formatCurrency(summary.totalIncome)}
                    </Typography>

                    <Typography
                        fontWeight={600}
                        color="text.secondary"
                        mb={1}
                        fontSize={20}
                    >
                        {t("dashboard.expenseSummaryTitle")}
                    </Typography>

                    <Typography
                        fontSize={33}
                        fontWeight={700}
                        textAlign={"right"}
                    >
                        {formatCurrency(summary.totalExpense)}
                    </Typography>
                </Box>

                {/* VERTICAL DIVIDER */}
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 4 }}
                />

                {/* RIGHT SIDE */}
                <Box flex={1}>
                    <Typography
                        fontWeight={600}
                        color="text.secondary"
                        fontSize={15}
                    >
                        {t("dashboard.taxTotal")}
                    </Typography>
                    <Typography fontSize={28} fontWeight={700} textAlign={"right"}>
                        {formatCurrency(summary.taxTotal)}
                    </Typography>

                    <Typography
                        fontWeight={600}
                        color="text.secondary"
                        fontSize={15}
                    >
                        {t("dashboard.deductionSummary")}
                    </Typography>
                    <Typography fontSize={28} fontWeight={700} textAlign={"right"}>
                        {formatCurrency(summary.taxDeduction || 0)}
                    </Typography>

                    <Typography
                        fontWeight={600}
                        color="text.secondary"
                        fontSize={15}
                    >
                        {t("dashboard.expenseSummary")}
                    </Typography>
                    <Typography fontSize={28} fontWeight={700} textAlign={"right"} >
                        {formatCurrency(summary.taxExpense || 0)}
                    </Typography>

                    <Divider sx={{ my: 0.5 }} />

                    <Typography
                        fontWeight={600}
                        color="text.secondary"
                        fontSize={15}
                    >
                        {t("dashboard.taxPayable")}
                    </Typography>

                    <Typography
                        fontSize={30}
                        fontWeight={800}
                        textAlign={"right"}
                    >
                        {formatCurrency(summary.taxPayable)}
                    </Typography>
                </Box>
            </Box>

            {/* DETAIL LINK CENTER */}
            <Box
                mt={1}
                textAlign="center"
                sx={{ cursor: "pointer" }}
                onClick={onOpenDetail}
            >
                <Typography
                    fontWeight={600}
                    sx={{
                        textDecoration: "underline",
                    }}
                >
                    {t("dashboard.viewDetail")}
                </Typography>
            </Box>
        </Card>
    );
}

export default SummaryCard;