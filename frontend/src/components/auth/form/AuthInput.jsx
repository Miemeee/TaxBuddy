import React from "react";
import { TextField } from "@mui/material";

function AuthInput({ endAdornment, sx, ...props }) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            {...props}
            sx={{
                mb: 2,

                "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "grey.100",
                },

                "& fieldset": {
                    border: "none",
                },

                ...sx,
            }}
            InputProps={{ endAdornment }}
        />
    );
}

export default AuthInput;