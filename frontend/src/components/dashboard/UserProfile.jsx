// src/components/dashboard/UserProfile.jsx

import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const username = user?.name || "User";
    const initial = username?.charAt(0)?.toUpperCase() || "?";

    const handleGoProfile = () => {
        navigate("/profile");
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            mb={4}
            sx={{ cursor: "pointer" }}
            onClick={handleGoProfile}
        >
            <Avatar sx={{ mr: 2 }}>
                {initial}
            </Avatar>

            <Typography fontWeight={600}>
                {username}
            </Typography>
        </Box>
    );
}

export default UserProfile;