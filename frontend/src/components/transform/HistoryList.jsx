// src/components/history/HistoryList.jsx

import {
    Box,
    Typography,
    Card,
    Divider,
    Button,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import axios from "../../api/axios";
import EditTransactionModal from "./EditTransactionModal";

export default function HistoryList({ items = [], type, onUpdated }) {
    const { t } = useTranslation();
    const theme = useTheme();
    const [filter, setFilter] = useState("all");
    const [editingItem, setEditingItem] = useState(null);
    const backendOrigin = axios.defaults.baseURL?.replace(/\/api$/, "") || "";
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");

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

    const isImageFile = (url) => {
        return /\.(jpg|jpeg|png|gif|bmp|webp|avif|svg)$/i.test(url);
    };

    const handleOpenPreview = (url) => {
        if (!isImageFile(url)) {
            window.open(url, "_blank", "noreferrer");
            return;
        }

        setPreviewUrl(url);
        setPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
        setPreviewUrl("");
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
                                {item.document?.file_path && (
                                    <Typography fontSize={14} color="text.secondary">
                                        <Typography
                                            component="span"
                                            onClick={() => handleOpenPreview(`${backendOrigin}${item.document.file_path}`)}
                                            sx={{
                                                color: theme.palette.primary.main,
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            {item.document.file_path.split("/").pop()}
                                        </Typography>
                                    </Typography>
                                )}
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

            <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
                <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src={previewUrl}
                        alt={t("transaction.previewImage")}
                        style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePreview}>{t("transaction.close")}</Button>
                </DialogActions>
            </Dialog>

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