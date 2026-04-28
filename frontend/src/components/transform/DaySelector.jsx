import { useState, useMemo } from "react";
import {
    Box,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { ChevronLeft, ChevronRight, KeyboardArrowDown } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function DaySelector({ onSelect }) {
    const theme = useTheme();
    const today = new Date();

    const [centerDate, setCenterDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today);

    const [anchorEl, setAnchorEl] = useState(null);

    const days = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => {
            const date = new Date(centerDate);
            date.setDate(centerDate.getDate() + (i - 2));

            return {
                fullDate: date,
                date: date.getDate(),
                dow: date.toLocaleDateString("en-US", {
                    weekday: "short",
                }),
            };
        });
    }, [centerDate]);

    const handleSelect = (day) => {
        setSelectedDate(day.fullDate);
        onSelect?.(day.fullDate);
    };

    const moveDay = (direction) => {
        const newDate = new Date(centerDate);
        newDate.setDate(centerDate.getDate() + direction);
        setCenterDate(newDate);
    };

    // ===== เปลี่ยนเดือน =====
    const changeMonth = (monthIndex) => {
        const newDate = new Date(centerDate);
        newDate.setMonth(monthIndex);
        newDate.setDate(1);
        setCenterDate(newDate);
        setAnchorEl(null);
    };

    const thaiMonthYear = centerDate.toLocaleDateString("th-TH", {
        month: "long",
        year: "numeric",
    });

    const months = Array.from({ length: 12 }).map((_, i) =>
        new Date(2025, i).toLocaleDateString("th-TH", { month: "long" })
    );

    return (
        <Box>
            {/* ===== Header (Month Toggle) ===== */}
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                    <Typography fontWeight={500}>
                        {thaiMonthYear}
                    </Typography>
                    <KeyboardArrowDown fontSize="small" />
                </Box>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {months.map((m, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => changeMonth(index)}
                    >
                        {m}
                    </MenuItem>
                ))}
            </Menu>
            {/* ===== Day Selector ===== */}
            <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => moveDay(-1)}>
                    <ChevronLeft />
                </IconButton>

                <Box
                    display="flex"
                    gap={1}
                    flex={1}
                >
                    {days.map((d, index) => {
                        const selected =
                            d.fullDate.toDateString() ===
                            selectedDate.toDateString();

                        const isCenter = index === 2;

                        return (
                            <Box
                                key={index}
                                onClick={() => handleSelect(d)}
                                sx={{
                                    flex: 1,   // ⭐️ สำคัญ
                                    borderRadius: 1,
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    transform: isCenter
                                        ? "scale(1.05)"
                                        : "scale(1)",
                                    transition: "all 0.2s ease",
                                    boxShadow: selected
                                        ? "0 10px 20px rgba(29,79,145,0.3)"
                                        : "0 5px 15px rgba(0,0,0,0.05)",
                                    mb: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: selected
                                            ? theme.palette.primary.main
                                            : "#cbd5e1",
                                        height: 20,
                                    }}
                                />

                                <Box
                                    sx={{
                                        bgcolor: "#fff",
                                        textAlign: "center",
                                        py: { xs: 1, sm: 1.5 },
                                    }}
                                >
                                    <Typography
                                        fontWeight={700}
                                        fontSize={{ xs: 16, sm: 18 }}
                                    >
                                        {d.date}
                                    </Typography>
                                    <Typography
                                        fontSize={{ xs: 11, sm: 12 }}
                                        color="text.secondary"
                                    >
                                        {d.dow}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>

                <IconButton onClick={() => moveDay(1)}>
                    <ChevronRight />
                </IconButton>
            </Box>
        </Box>
    );
}