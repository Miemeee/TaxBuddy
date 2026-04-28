import {
    Paper,
    TextField,
    IconButton,
    Collapse,
    Box,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Controller } from "react-hook-form";
import SwitchRow from "./SwitchRow";

export default function DependentCard({
    control,
    index,
    type,
    remove,
}) {
    const { t } = useTranslation();
    return (
        <Paper
            elevation={0}
            sx={{
                mt: 2,
                p: 2.5,
                borderRadius: 3,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Typography fontWeight={600}>
                    {type === "children"
                        ? `${t("onboarding.child_index")} ${index + 1}`
                        : `${t("onboarding.child2_index")} ${index + 1}`}
                </Typography>

                <IconButton
                    size="small"
                    color="error"
                    onClick={remove}
                    sx={{
                        backgroundColor: "#fff",
                        "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                >
                    <RemoveCircleOutlineIcon />
                </IconButton>
            </Box>

            {/* AGE */}
            <Controller
                name={`${type}.${index}.age`}
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label={t("onboarding.child_age")}
                        type="number"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                )}
            />

            {/* DISABLED SWITCH */}
            <SwitchRow
                label={t("onboarding.child_disabled")}
                name={`${type}.${index}.disabled`}
                control={control}
            />

            {/* CARD NUMBER */}
            <Controller
                name={`${type}.${index}.hasCard`}
                control={control}
                render={({ field }) => (
                    <Collapse in={field.value}>
                        <TextField
                            label={t("onboarding.child_disabledcardno")}
                            fullWidth
                            sx={{ mt: 2 }}
                        />
                    </Collapse>
                )}
            />
        </Paper>
    );
}