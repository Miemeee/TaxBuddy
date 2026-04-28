// src/dialogs/EditIncomeChannelsDialog.jsx

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    IconButton,
    Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


export default function EditIncomeChannelsDialog({
    open,
    onClose,
    channels = [],
    onSave,
}) {
    const { t } = useTranslation();

    const [list, setList] = useState([""]);

    useEffect(() => {
        if (channels.length > 0) {
            setList(channels);
        } else {
            setList([""]);
        }
    }, [channels]);

    const handleChange = (index, value) => {
        const updated = [...list];
        updated[index] = value;
        setList(updated);
    };

    const handleAdd = () => {
        setList([...list, ""]);
    };

    const handleRemove = (index) => {
        const updated = list.filter((_, i) => i !== index);
        setList(updated.length ? updated : [""]);
    };

    const handleSave = () => {
        const cleaned = list
            .map((v) => v.trim())
            .filter(Boolean);

        onSave(cleaned);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle>
                {t("profile.editincomechannels")}
            </DialogTitle>

            <DialogContent>

                <Stack spacing={2} mt={1}>

                    {list.map((item, index) => (

                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >

                            <TextField
                                fullWidth
                                label={t("profile.incomeChannels")}
                                value={item}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                            />

                            <IconButton
                                color="error"
                                onClick={() => handleRemove(index)}
                            >
                                <DeleteIcon />
                            </IconButton>

                        </Box>

                    ))}

                    <Button
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                        sx={{ alignSelf: "flex-start" }}
                    >
                        {t("profile.addIncomechannels")}
                    </Button>

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
