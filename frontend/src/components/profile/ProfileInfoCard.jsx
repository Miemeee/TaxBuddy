// components/profile/ProfileInfoCard.jsx

import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import EditProfileDialog from "./dialogs/EditProfileDialog";
import { useTranslation } from "react-i18next";

export default function ProfileInfoCard({ user, onSave }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    if (!user) return null;

    return (
        <>
            <Card>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h6">
                            {t("profile.profile")}
                        </Typography>

                        <Typography>
                            {t("profile.name2")} {user.name}
                        </Typography>

                        <Typography>
                            {t("profile.email")} {user.email}
                        </Typography>

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

            <EditProfileDialog
                open={open}
                onClose={() => setOpen(false)}
                user={user}
                onSave={onSave}
            />
        </>
    );
}