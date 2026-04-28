// src/pages/WelcomePage.jsx

import { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/logo.png";

function WelcomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const hasOnboarded =
      localStorage.getItem("has_onboarded") === "true";

    if (hasOnboarded) {
      navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box textAlign="center" maxWidth={420} width="100%">
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.main"
          mb={1}
        >
          {t("welcome.title")}
        </Typography>

        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{ width: 220, my: 2 }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          mb={6}
        >
          {t("welcome.subtitle")}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{
            py: 1.6,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          {t("welcome.loading")}
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomePage;