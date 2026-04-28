import { Box, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Controller } from "react-hook-form";

export default function RadioSection({ label, name, control, options }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box>
                    <Typography fontWeight={600} mb={1}>
                        {label}
                    </Typography>
                    <RadioGroup row {...field}>
                        {options.map((o) => (
                            <FormControlLabel
                                key={o.value}
                                value={o.value}
                                control={<Radio />}
                                label={o.label}
                            />
                        ))}
                    </RadioGroup>
                </Box>
            )}
        />
    );
}