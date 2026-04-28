import { Box, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

export default function IncomeChannelCard({
    control,
    index,
    remove,
}) {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mb: 2,
            }}
        >
            <Controller
                name={`incomeChannels.${index}.name`}
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label={t("onboarding.incomePlaceholder")}
                    />
                )}
            />

            <IconButton color="error" onClick={remove}>
                <DeleteIcon />
            </IconButton>
        </Box>
    );
}