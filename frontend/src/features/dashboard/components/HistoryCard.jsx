// src/pages/components/HistoryCard.jsx

import React, { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Select,
    MenuItem,
    FormControl,
    Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const formatCurrency = (num = 0) =>
    `฿${Math.abs(num).toLocaleString("th-TH")}`;

function HistoryCard({ history }) {
    const { t } = useTranslation();
    const [filterType, setFilterType] = useState("all");

    if (!history?.length) return null;

    const filteredHistory =
        filterType === "all"
            ? history
            : history.filter((item) => item.type === filterType);

    return (
        <Box mt={4}>
            {/* Header Section */}
            <Typography variant="h6" mb={1}>
                {t("dashboard.historyTitle")}
            </Typography>

            <FormControl size="small" sx={{ mb: 3, minWidth: 140 }}>
                <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <MenuItem value="all">{t("dashboard.all")}</MenuItem>
                    <MenuItem value="income">{t("dashboard.income")}</MenuItem>
                    <MenuItem value="expense">{t("dashboard.expense")}</MenuItem>
                </Select>
            </FormControl>

            {/* History List */}
            {filteredHistory.map((item) => (
                <Paper
                    key={item.id}
                    sx={{
                        width: "100%",
                        p: 2,
                        borderRadius: 2,
                        mb: 2,
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="stretch"
                    >
                        {/* LEFT */}
                        <Box>
                            <Typography fontWeight={500}>
                                {item.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                mt={0.5}
                            >
                                {item.date}
                            </Typography>
                        </Box>

                        {/* RIGHT */}
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="flex-end"
                            justifyContent="space-between"
                        >
                            <Button
                                size="small"
                                sx={{
                                    backgroundColor: "#FFF3E0",
                                    color: "#FF9800",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    borderRadius: 2,
                                    px: 1.5,
                                    minWidth: "auto",
                                }}
                            >
                                {t("dashboard.edit")}
                            </Button>

                            <Typography
                                fontWeight={700}
                                color={
                                    item.type === "income"
                                        ? "success.main"
                                        : "error.main"
                                }
                                mt={1}
                            >
                                {item.type === "income" ? "+" : "-"}
                                {formatCurrency(item.amount)}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}

export default HistoryCard;