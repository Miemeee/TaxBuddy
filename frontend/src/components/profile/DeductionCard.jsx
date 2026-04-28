// components/profile/DeductionsCard.jsx
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import EditDeductionsDialog from "./dialogs/EditDeductionsDialog";
import { useTranslation } from "react-i18next";

export default function DeductionsCard({
    deductions = [],
    updateDeductions
}) {
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    return (
        <>
            <Card>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h6">
                            {t("profile.deduction")}
                        </Typography>

                        {deductions.length === 0 && (
                            <Typography color="text.secondary">
                                {t("profile.noHaveDeduction")}
                            </Typography>
                        )}

                        {deductions.map((d, index) => (
                            <Typography key={index}>
                                {d?.deduction?.deduction_name} : {d?.amount_claimed}
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

            <EditDeductionsDialog
                open={open}
                onClose={() => setOpen(false)}
                deductions={deductions}
                updateDeductions={updateDeductions}
            />
        </>
    );
}