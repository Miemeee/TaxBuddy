// src/pages/components/HistoryCard.jsx

import React, { useState, useMemo } from "react";
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
import EditTransactionModal from "../transform/EditTransactionModal";

const formatCurrency = (num = 0) =>
    `฿${Math.abs(Number(num)).toLocaleString("th-TH", {
        minimumFractionDigits: 2,
    })}`;

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("th-TH");
};

function HistoryCard({ history = [], onUpdated }) {
    const { t } = useTranslation();

    const [filterType, setFilterType] = useState("all");
    const [editingItem, setEditingItem] = useState(null);

    const filteredHistory = useMemo(() => {

        if (filterType === "all") return history;
        return history.filter((item) => item.type === filterType);
    }, [filterType, history]);

    const handleEdit = (item) => {
        const normalized = {
            ...item,
            transaction_id: item.transaction_id ?? item.id,
        };
        setEditingItem(normalized);
    };

    if (!history.length) return null;

    return (
        <Box mt={4}>

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

            {filteredHistory.map((item) => {
                console.log("history item", item);
                const key = item.transaction_id ?? item.id;

                return (
                    <Paper
                        key={key}
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
                                    {item.walletType}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={0.5}
                                >
                                    {formatDate(item.date)}
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
                                    onClick={() => handleEdit(item)}
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
                );
            })}

            <EditTransactionModal
                open={Boolean(editingItem)}
                item={editingItem}
                type={editingItem?.type}
                onClose={() => setEditingItem(null)}
                onUpdated={onUpdated}
            />

        </Box>
    );
}

export default HistoryCard;