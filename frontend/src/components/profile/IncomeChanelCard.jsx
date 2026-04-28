// components/profile/IncomeChannelsCard.jsx

import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import EditIncomeChannelsDialog from "./dialogs/EditIncomeChanelsDialog";
import { useTranslation } from "react-i18next";

export default function IncomeChannelsCard({ channels = [], onSave }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h6">
                            {t("profile.incomeChannels")}
                        </Typography>

                        {channels.length === 0 && (
                            <Typography color="text.secondary">
                                {t("profile.noHaveincomeChannels")}
                            </Typography>
                        )}

                        {channels.map((c, index) => (
                            <Typography key={index}>
                                • {c}
                            </Typography>
                        ))}

                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setOpen(true)}
                        >
                            {t("profile.edit")}
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            <EditIncomeChannelsDialog
                open={open}
                onClose={() => setOpen(false)}
                channels={channels}
                onSave={onSave}
            />
        </>
    );
}