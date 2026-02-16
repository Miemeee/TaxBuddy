import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/logo.png";

import { authService } from "../auth/services/authService";

function WelcomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleStart = () => {
    const completed = authService.shouldGoToDashboard();

    navigate(completed ? "/dashboard" : "/onboarding");
  };

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
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          maxWidth: 420,
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.main"
          mb={1}
        >
          {t("welcome.title")}
        </Typography>

        {/* LOGO */}
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{
            width: 220,
            my: 2,
          }}
        />

        {/* SUBTITLE */}
        <Typography
          variant="body2"
          color="text.secondary"
          mb={6}
        >
          {t("welcome.subtitle")}
        </Typography>

        {/* BUTTON */}
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handleStart}
          sx={{
            py: 1.6,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,

            boxShadow: (theme) =>
              `0px 12px 24px ${theme.palette.primary.main}40`,

            "&:hover": {
              boxShadow: (theme) =>
                `0px 16px 32px ${theme.palette.primary.main}55`,
            },
          }}
        >
          {t("welcome.button")}
        </Button>
      </Box>
    </Box>
  );
}

export default WelcomePage;