import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Stack,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

export default function NotificationDialog({
    open,
    onClose,
    notifications = []
}) {
    const { t } = useTranslation();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Typography fontWeight="bold">
                    {t("dashboard.notification")}
                </Typography>

                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 3 }}>
                {notifications.length === 0 ? (
                    <Typography color="text.secondary" textAlign="center" py={2}>
                        {t("dashboard.noHaveNotification")}
                    </Typography>
                ) : (
                    <Stack spacing={2} mt={1}>
                        {notifications.map((n, index) => (
                            <Alert
                                key={index}
                                severity={n.level || "info"}
                                variant="outlined"
                            >
                                {t(`dashboard.notifications.${n.errorCode}`, n.params)}
                            </Alert>
                        ))}
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
}