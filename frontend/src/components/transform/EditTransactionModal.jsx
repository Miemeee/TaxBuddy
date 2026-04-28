import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import TransactionForm from "./TransactionForm";

export default function EditTransactionModal({
    open,
    onClose,
    item,
    type,
    onUpdated,
}) {
    const { t } = useTranslation();
    if (!open || !item) return null;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 2,
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: 600,
                }}
            >
                {t("transaction.editTitle")}
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    maxHeight: "75vh",
                    overflowY: "auto",
                }}
            >
                <TransactionForm
                    type={type}
                    initialData={item}
                    transactionId={item.transaction_id}
                    isEdit={true}
                    variant="embedded"
                    onSuccess={() => {
                        onUpdated?.();
                        onClose();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}