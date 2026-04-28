// src/pages/components/RecommendSection.jsx

import React from "react";
import {
    Box,
    Grid,
    Typography,
    Paper,
    useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const formatCurrency = (num = 0) =>
    `${Number(num).toLocaleString("th-TH")} ฿`;

function RecommendSection({ deductions = [] }) {
    const { t } = useTranslation();
    const theme = useTheme();

    if (!deductions.length) return null;

    const totalDeduction = deductions.reduce(
        (sum, d) => sum + d.amount_claimed,
        0
    ) + 60000;

    return (
        <Box
            sx={{
                py: 8,
                textAlign: "center",
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Typography
                sx={{
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                    mb: 2,
                }}
            >
                {t("dashboard.recommendedTitle")}
            </Typography>

            <Typography
                sx={{
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2,
                }}
            >
                {t("dashboard.greeting")}
            </Typography>

            <Typography
                sx={{
                    fontSize: "2.25rem",
                    fontWeight: 800,
                    color: theme.palette.primary.main,
                    mb: 6,
                }}
            >
                {formatCurrency(totalDeduction)}
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {deductions.map((item) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={item.user_deduction_id}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                borderRadius: 2,
                                backgroundColor: theme.palette.background.paper,
                                border: `1px solid ${theme.palette.divider}`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: theme.shadows[4],
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    fontWeight: 700,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                }}
                            >
                                {t(`dashboard.deduction.${item.deduction_id}`)}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    color: theme.palette.text.secondary,
                                    mb: 2,
                                }}
                            >
                                {t("dashboard.deductionSub")}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "1.25rem",
                                    fontWeight: 800,
                                    color: theme.palette.primary.main,
                                }}
                            >
                                + {formatCurrency(item.amount_claimed)}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default RecommendSection;