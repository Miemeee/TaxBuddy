import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Checkbox,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

function formatCurrency(num) {
    return `฿${num.toLocaleString("th-TH")}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString("th-TH");
}

export default function SelectableDetailDialog({
    open,
    onClose,
    group,
    selectedIds,
    toggleSelect,
}) {
    const { t } = useTranslation();
    const selectAll = () => {
        group.items.forEach((item) => {
            if (!selectedIds.includes(item.id)) {
                toggleSelect(item.id);
            }
        });
    };
    const selectedItems = group.items.filter((i) =>
        selectedIds.includes(i.id)
    );

    const total = selectedItems.reduce(
        (sum, i) => sum + i.amount,
        0
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth>

            <Box
                sx={{
                    px: 3,
                    pt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography fontWeight={700}>{group.type}</Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <DialogContent dividers>
                {group.items.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1,
                        }}
                    >
                        <Box>
                            <Typography fontWeight={500}>
                                {item.title}
                            </Typography>

                            {item.description && (
                                <Typography
                                    sx={{
                                        fontSize: "0.8rem",
                                        color: "text.secondary",
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            )}

                            {item.date && (
                                <Typography
                                    sx={{
                                        fontSize: "0.8rem",
                                        color: "text.secondary",
                                    }}
                                >
                                    {formatDate(item.date)}
                                </Typography>
                            )}

                            {/* AMOUNT */}
                            <Typography fontWeight={600}>
                                {formatCurrency(item.amount)}
                            </Typography>
                        </Box>

                        <Checkbox
                            checked={selectedIds.includes(item.id)}
                            onChange={() => toggleSelect(item.id)}
                        />
                    </Box>
                ))}
            </DialogContent>

            <Box
                sx={{
                    px: 3,
                    pb: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Button onClick={selectAll}>{t("simulation.selectAll")}</Button>
            </Box>

        </Dialog>
    );
}