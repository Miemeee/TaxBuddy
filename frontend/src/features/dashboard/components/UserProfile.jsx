// src/pages/components/UserProfile.jsx

import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

function UserProfile({ username, initial }) {
    return (
        <Box display="flex" alignItems="center" mb={4}>
            <Avatar sx={{ mr: 2 }}>{initial}</Avatar>

            <Typography fontWeight={600}>
                {username}
            </Typography>
        </Box>
    );
}

export default UserProfile;