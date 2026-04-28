import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AutoNotification({ notifications = [] }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (notifications.length > 0) {
            setIndex(0);
            setOpen(true);
        }
    }, [notifications]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setOpen(false);

        if (index < notifications.length - 1) {
            setTimeout(() => {
                setIndex((prev) => prev + 1);
                setOpen(true);
            }, 500);
        }
    };

    const current = notifications[index];

    if (!current) return null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                severity={current.level || "info"}
                variant="filled"
                onClose={handleClose}
                sx={{ width: "100%", boxShadow: 3 }}
            >
                {t(`dashboard.notifications.${current.errorCode}`, current.params)}
            </Alert>
        </Snackbar>
    );
}