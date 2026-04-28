import React, { useState, useEffect } from "react";
import { Box, IconButton, Backdrop, Badge } from "@mui/material";
import {
    HomeRounded,
    AddRounded,
    NotificationsRounded,
} from "@mui/icons-material";

import ActionPopup from "./ActionPopup";
import NotificationDialog from "../dashboard/NotificationDialog";

function BottomNavigationBar({ notifications = [] }) {
    const [openAction, setOpenAction] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [unreadCount, setUnreadCount] = useState(notifications.length);

    useEffect(() => {
        setUnreadCount(notifications.length);
    }, [notifications]);

    const handleHomeClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleAddClick = () => {
        setOpenAction(true);
    };

    const handleClose = () => {
        setOpenAction(false);
    };

    const handleOpenNotification = () => {
        setOpenNotification(true);
        setUnreadCount(0);
    };

    const handleCloseNotification = () => {
        setOpenNotification(false);
    };

    return (
        <>
            <Backdrop
                open={openAction}
                onClick={handleClose}
                sx={{
                    zIndex: 1200,
                    bgcolor: "rgba(0,0,0,0.5)",
                }}
            />

            {openAction && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1300,
                    }}
                >
                    <ActionPopup onClose={handleClose} />
                </Box>
            )}

            <NotificationDialog
                open={openNotification}
                onClose={handleCloseNotification}
                notifications={notifications}
            />

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
                    zIndex: 100,
                }}
            >
                <IconButton onClick={handleHomeClick}>
                    <HomeRounded />
                </IconButton>

                <IconButton
                    onClick={handleAddClick}
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

                <IconButton onClick={handleOpenNotification}>
                    <Badge
                        badgeContent={unreadCount}
                        color="error"
                        invisible={unreadCount === 0}
                    >
                        <NotificationsRounded />
                    </Badge>
                </IconButton>
            </Box>
        </>
    );
}

export default BottomNavigationBar;