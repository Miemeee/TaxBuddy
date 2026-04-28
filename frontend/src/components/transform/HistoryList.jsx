// src/components/history/HistoryList.jsx

import {
    Box,
    Typography,
    Card,
    Divider,
    Button,
    Select,
    MenuItem,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import EditTransactionModal from "./EditTransactionModal";

export default function HistoryList({ items = [], type, onUpdated }) {
    const { t } = useTranslation();
    const [filter, setFilter] = useState("all");
    const [editingItem, setEditingItem] = useState(null);

    const isIncome = type === "income";

    const walletTypes = useMemo(() => {
        const types = items.map((item) => item.wallet_type);
        return [...new Set(types)];
    }, [items]);

    const filteredItems = useMemo(() => {
        if (filter === "all") return items;
        return items.filter((item) => item.wallet_type === filter);
    }, [filter, items]);

    const formatAmount = (num) => {
        const abs = Math.abs(Number(num));
        const sign = isIncome ? "+" : "-";

        return `${sign} ฿${abs.toLocaleString("th-TH", {
            minimumFractionDigits: 2,
        })}`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("th-TH");
    };

    return (
        <Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography fontSize={20} fontWeight={700}>
                    {t("transaction.historyTitle")}
                </Typography>

                <Select
                    size="small"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <MenuItem value="all">{t("transaction.filterAll")}</MenuItem>

                    {walletTypes.map((wallet) => (
                        <MenuItem key={wallet} value={wallet}>
                            {wallet}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* ===== History Card ===== */}
            <Card sx={{ borderRadius: 3 }}>
                {filteredItems.map((item, index) => (
                    <Box key={item.transaction_id}>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                px: 3,
                                py: 2.5,
                            }}
                        >

                            {/* Left */}
                            <Box>
                                <Typography fontWeight={600}>
                                    {item.wallet_type}
                                </Typography>

                                <Typography
                                    fontSize={14}
                                    color="text.secondary"
                                >
                                    {formatDate(item.date)}
                                </Typography>
                            </Box>

                            {/* Right */}
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-end"
                                gap={1}
                            >
                                <Button
                                    size="small"
                                    sx={{
                                        px: 2,
                                        borderRadius: 2,
                                        textTransform: "none",
                                        bgcolor: "#fef3c7",
                                        color: "#92400e",
                                    }}
                                    onClick={() => setEditingItem(item)}
                                >
                                    {t("transaction.editTitle")}
                                </Button>

                                <Typography
                                    fontWeight={600}
                                    color={
                                        isIncome
                                            ? "success.main"
                                            : "error.main"
                                    }
                                >
                                    {formatAmount(item.amount)}
                                </Typography>
                            </Box>
                        </Box>

                        {index !== filteredItems.length - 1 && <Divider />}
                    </Box>
                ))}
            </Card>

            {/* ===== Edit Modal ===== */}
            <EditTransactionModal
                open={Boolean(editingItem)}
                item={editingItem}
                onClose={() => setEditingItem(null)}
                type={type}
                onUpdated={onUpdated}
            />
        </Box>
    );
}