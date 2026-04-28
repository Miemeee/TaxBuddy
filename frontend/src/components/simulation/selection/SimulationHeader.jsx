import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SimulationHeader({ step }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const subtitle =
        step === "income"
            ? t("simulation.step1")
            : step === "deduction"
                ? t("simulation.step2")
                : t("simulation.step3");

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{ position: "absolute", left: 16 }}
                >
                    <ArrowBack />
                </IconButton>
            </Box>

            <Typography
                sx={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#1d4f91",
                    textAlign: "center",
                    mt: 2,
                }}
            >
                {t("simulation.title")}
            </Typography>

            <Typography
                sx={{
                    fontSize: "0.95rem",
                    color: "#6b7280",
                    textAlign: "center",
                    mt: 1,
                    mb: 5,
                }}
            >
                {subtitle}
            </Typography>
        </>
    );
}