// src/dialogs/EditProfileDialog.jsx

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function EditProfileDialog({ open, onClose, user, onSave }) {
    const { t } = useTranslation();
    const [name, setName] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    const handleSave = () => {
        onSave({ name });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>  {t("profile.editprofileinfo")}</DialogTitle>

            <DialogContent>
                <Stack mt={1}>
                    <TextField
                        label={t("profile.name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    {t("profile.cancel")}
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    {t("profile.save")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}