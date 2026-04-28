// src/pages/components/SummaryCard.jsx

import React from "react";
import { Card, Typography, Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const formatCurrency = (num = 0) =>
    `${Number(num).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })} ฿`;

function SummaryCard({ summary = {}, onOpenDetail }) {
    const { t } = useTranslation();

    const safeSummary = {
        totalIncome: summary.totalIncome ?? 0,
        totalExpense: summary.totalExpense ?? 0,
        taxTotal: summary.taxTotal ?? 0,
        taxDeduction: summary.taxDeduction ?? summary.totalDeduction ?? 0,
        taxExpense: summary.taxExpense ?? 0,
        taxPayable: summary.taxPayable ?? 0,
    };

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
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            mb: 1,
                        }}
                    >
                        {t("dashboard.incomeSummaryTitle")}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            mb: 4,
                            textAlign: "right",
                        }}
                    >
                        {formatCurrency(safeSummary.totalIncome)}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "text.secondary",
                            mb: 1.5,
                        }}
                    >
                        {t("dashboard.expenseSummaryTitle")}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.75rem",
                            fontWeight: 700,
                            textAlign: "right",
                        }}
                    >
                        {formatCurrency(safeSummary.totalExpense)}
                    </Typography>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 4 }} />

                {/* RIGHT SIDE */}
                <Box flex={1}>
                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "text.secondary",
                        }}
                    >
                        {t("dashboard.taxTotal")}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            textAlign: "right",
                        }}
                    >
                        {formatCurrency(safeSummary.taxTotal)}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "text.secondary",
                        }}
                    >
                        {t("dashboard.deductionSummary")}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            textAlign: "right",
                        }}
                    >
                        {formatCurrency(safeSummary.taxDeduction)}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "text.secondary",
                        }}
                    >
                        {t("dashboard.expenseSummary")}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            textAlign: "right",
                        }}
                    >
                        {formatCurrency(safeSummary.taxExpense)}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Typography
                        sx={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "text.secondary",
                        }}
                    >
                        {t("dashboard.taxPayable")}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1.25rem",
                            fontWeight: 800,
                            textAlign: "right",
                        }}
                    >
                        {formatCurrency(safeSummary.taxPayable)}
                    </Typography>
                </Box>
            </Box>

            <Box
                mt={2}
                textAlign="center"
                sx={{ cursor: "pointer" }}
                onClick={onOpenDetail}
            >
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
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