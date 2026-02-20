// components/dashboard/BottomNavigationBar.jsx

import React from "react";
import { Box, IconButton } from "@mui/material";
import {
    HomeRounded,
    AddRounded,
    NotificationsRounded,
} from "@mui/icons-material";

function BottomNavigationBar() {
    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                bgcolor: "background.paper",
                py: 1,
                display: "flex",
                justifyContent: "space-around",
                boxShadow: 3,
            }}
        >
            <IconButton>
                <HomeRounded />
            </IconButton>

            <IconButton
                sx={{
                    bgcolor: "primary.main",
                    color: "common.white",
                    width: 48,
                    height: 48,
                    "&:hover": {
                        bgcolor: "primary.dark",
                    },
                }}
            >
                <AddRounded />
            </IconButton>

            <IconButton>
                <NotificationsRounded />
            </IconButton>
        </Box>
    );
}

export default BottomNavigationBar;
