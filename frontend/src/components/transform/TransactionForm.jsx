import { useEffect, useState } from "react";
import {
    Card,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import axios from "../../api/axios";
import { transactionService } from "../../services/transactionService";

const backendOrigin = axios.defaults.baseURL?.replace(/\/api$/, "") || "";

export default function TransactionForm({
    type = "income",
    initialData = null,
    isEdit = false,
    transactionId = null,
    onSuccess,
    variant = "card",
}) {
    const { t } = useTranslation();
    const theme = useTheme();
    const isIncome = type === "income";

    const [walletType, setWalletType] = useState("");
    const [customWalletType, setCustomWalletType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [amount, setAmount] = useState("");
    const [detail, setDetail] = useState("");
    const [file, setFile] = useState(null);
    const [savedFile, setSavedFile] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const [incomeChannels, setIncomeChannels] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);

    const [amountError, setAmountError] = useState("");
    const [walletError, setWalletError] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await axios.get("/users/profile");
                const channels = res.data?.data?.incomeChannels || [];

                if (Array.isArray(channels)) {
                    setIncomeChannels(channels);

                    if (!isEdit && channels.length > 0) {
                        setWalletType(channels[0]);
                    }
                }
            } catch (err) {
                console.error("Failed to load profile:", err);
            }
        };

        loadProfile();
    }, [isEdit]);

    useEffect(() => {
        if (initialData) {
            const d = new Date(initialData.date);
            const wallet = initialData.wallet_type || "";

            setWalletType(wallet);
            setCustomWalletType(wallet && !incomeChannels.includes(wallet) ? wallet : "");
            setDate(d.toISOString().split("T")[0]);
            setTime(d.toTimeString().slice(0, 5));
            setAmount(Math.abs(initialData.amount || ""));
            setDetail(initialData.description || "");
            setSavedFile(initialData.document?.file_path || null);
        } else {
            const now = new Date();
            setDate(now.toISOString().split("T")[0]);
            setTime(now.toTimeString().slice(0, 5));
            setSavedFile(null);
        }
    }, [initialData, incomeChannels]);

    const handleSubmit = async () => {
        const selectedWalletType =
            walletType === "other" ? customWalletType.trim() : walletType;

        if (!selectedWalletType) {
            setWalletError(t("transaction.selectWallet"));
            return;
        }

        if (!amount) {
            setAmountError(t("transaction.amountRequired"));
            return;
        }

        if (Number(amount) <= 0) {
            setAmountError(t("transaction.amountPositive"));
            return;
        }

        setWalletError("");
        setAmountError("");

        try {
            const combinedDate = new Date(`${date}T${time || "00:00"}`);

            const payload = new FormData();
            payload.append("amount", Number(amount).toString());
            payload.append("description", detail);
            payload.append("date", combinedDate.toISOString());
            payload.append("transaction_type", type);
            payload.append("wallet_type", selectedWalletType);
            if (file) {
                payload.append("file", file);
            }

            if (isEdit && transactionId) {
                await transactionService.update(transactionId, {
                    amount: Number(amount),
                    description: detail,
                    date: combinedDate,
                    transaction_type: type,
                    wallet_type: selectedWalletType,
                });
                onSuccess?.();
                return;
            }

            const created = await transactionService.create(payload);
            setSavedFile(created.document?.file_path || null);

            setOpenSuccess(true);
            setAmount("");
            setDetail("");
            setFile(null);

            onSuccess?.();

        } catch (err) {
            console.error("Transaction save failed:", err);
        }
    };

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: theme.palette.grey[100],
            "& fieldset": { border: "none" },
        },
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

    const FormContent = (
        <>
            {variant === "card" && (
                <Typography variant="h6" fontWeight={600} mb={2}>
                    {isIncome
                        ? t("transaction.saveincome")
                        : t("transaction.saveexpense")}
                </Typography>
            )}

            <Grid container spacing={3} mb={2}>
                <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" mb={0.5}>
                        {t("transaction.date")}
                    </Typography>
                    <TextField
                        type="date"
                        fullWidth
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={inputSx}
                    />
                </Grid>

                <Grid size={{ xs: 6 }}>
                    <Typography variant="body2" mb={0.5}>
                        {t("transaction.time")}
                    </Typography>
                    <TextField
                        type="time"
                        fullWidth
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        sx={inputSx}
                    />
                </Grid>
            </Grid>

            <Typography variant="body2" mb={1}>
                {t("transaction.wallet")}
            </Typography>

            <Box display="flex" gap={1.5} flexWrap="wrap" mb={1}>
                {incomeChannels.map((channel) => {
                    const selected = walletType === channel;

                    return (
                        <Button
                            key={channel}
                            onClick={() => {
                                setWalletType(channel);
                                setCustomWalletType("");
                                setWalletError("");
                            }}
                            sx={{
                                minWidth: 110,
                                height: 44,
                                borderRadius: 3,
                                textTransform: "none",
                                fontWeight: 500,
                                bgcolor: selected
                                    ? theme.palette.primary.main
                                    : theme.palette.grey[200],
                                color: selected
                                    ? theme.palette.primary.contrastText
                                    : theme.palette.text.secondary,
                            }}
                        >
                            {channel}
                        </Button>
                    );
                })}
                <Button
                    key="other"
                    onClick={() => {
                        setWalletType("other");
                        setWalletError("");
                    }}
                    sx={{
                        minWidth: 110,
                        height: 44,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: 500,
                        bgcolor:
                            walletType === "other"
                                ? theme.palette.primary.main
                                : theme.palette.grey[200],
                        color:
                            walletType === "other"
                                ? theme.palette.primary.contrastText
                                : theme.palette.text.secondary,
                    }}
                >
                    {t("transaction.otherChannel")}
                </Button>
            </Box>

            {walletType === "other" && (
                <TextField
                    fullWidth
                    value={customWalletType}
                    placeholder={t("transaction.otherChannelPlaceholder")}
                    onChange={(e) => {
                        setCustomWalletType(e.target.value);
                        if (e.target.value.trim()) {
                            setWalletError("");
                        }
                    }}
                    sx={{ ...inputSx, mb: 2 }}
                />
            )}

            {walletError && (
                <Typography color="error" fontSize={14} mb={1}>
                    {walletError}
                </Typography>
            )}

            <Typography variant="body2" mb={1}>
                {t("transaction.amount")}
            </Typography>

            <TextField
                fullWidth
                value={amount}
                placeholder={t("transaction.amount")}
                error={Boolean(amountError)}
                helperText={amountError}
                onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setAmount(value);

                    if (value) {
                        setAmountError("");
                    }
                }}
                sx={{ ...inputSx, mb: 2 }}
            />

            <Typography variant="body2" mb={1}>
                {t("transaction.description")}
            </Typography>

            <TextField
                fullWidth
                value={detail}
                placeholder={t("transaction.description")}
                onChange={(e) => setDetail(e.target.value)}
                sx={{ ...inputSx, mb: 2 }}
            />

            <Typography variant="body2" mb={1}>
                {t("transaction.attachFile")}
            </Typography>

            <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{
                    borderRadius: 3,
                    height: 44,
                    justifyContent: "space-between",
                    textTransform: "none",
                    mb: 1,
                }}
            >
                {file ? file.name : t("transaction.chooseFile")}
                <input
                    type="file"
                    hidden
                    onChange={(e) => {
                        const selected = e.target.files?.[0] || null;
                        setFile(selected);
                    }}
                />
            </Button>

            {(savedFile || file) && (
                <Typography fontSize={14} mb={2}>
                    {t("transaction.currentFile")}:
                    {savedFile ? (
                        <Typography
                            component="span"
                            onClick={() => handleOpenPreview(`${backendOrigin}${savedFile}`)}
                            sx={{
                                color: theme.palette.primary.main,
                                cursor: "pointer",
                                marginLeft: 1,
                                display: "inline-block",
                            }}
                        >
                            {savedFile.split("/").pop()}
                        </Typography>
                    ) : (
                        <span style={{ marginLeft: 4 }}>{file.name}</span>
                    )}
                </Typography>
            )}

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

            <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{
                    borderRadius: 3,
                    py: 1.6,
                    textTransform: "none",
                    fontWeight: 600,
                    bgcolor: isIncome
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                }}
            >
                {t("transaction.save")}
            </Button>
        </>
    );

    return (
        <>
            {variant === "card" ? (
                <Card
                    sx={{
                        borderRadius: 3,
                        p: 3,
                        boxShadow: theme.shadows[6],
                    }}
                >
                    {FormContent}
                </Card>
            ) : (
                <Box>{FormContent}</Box>
            )}

            {!isEdit && (
                <Snackbar
                    open={openSuccess}
                    autoHideDuration={3000}
                    onClose={() => setOpenSuccess(false)}
                >
                    <Alert severity="success" variant="filled">
                        {t("transaction.saveSuccess")}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
}