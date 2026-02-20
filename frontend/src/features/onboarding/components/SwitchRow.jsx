import { Box, Typography, Switch } from "@mui/material";
import { Controller } from "react-hook-form";

export default function SwitchRow({ label, name, control }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        py: 1.5,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Typography>{label}</Typography>
                    <Switch {...field} checked={field.value} />
                </Box>
            )}
        />
    );
}