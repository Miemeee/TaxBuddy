// src/pages/components/RecommendSection.jsx

import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

const formatCurrency = (num = 0) =>
    `฿${num.toLocaleString("th-TH")}`;

function RecommendSection({ data }) {
    const { t } = useTranslation();
    if (!data?.length) return null;

    return (
        <Box mt={4}>
            <Typography variant="h6" mb={2}>
                {t("dashboard.recommendedTitle")}
            </Typography>

            <Grid container spacing={2}>
                {data.map((item) => (
                    <Grid size={{ xs: 6 }} key={item.id}>
                        <Paper
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                textAlign: "center",
                            }}
                        >
                            <Typography variant="body2">
                                {item.label}
                            </Typography>

                            <Typography fontWeight={700} mt={1}>
                                + {formatCurrency(item.amount)}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default RecommendSection;