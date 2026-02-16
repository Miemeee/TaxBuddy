import { Box, Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import Logo from "../../../assets/logo.png";
import LoginForm from "../components/form/LoginForm";

function LoginPage() {

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ maxWidth: 420, mx: "auto", textAlign: "center" }}>

          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            mb={3}
          >
            {t("auth.signin.title")}
          </Typography>

          <LoginForm />

          <Box mt={6}>
            <Box
              component="img"
              src={Logo}
              width={140}
              sx={{ opacity: 0.7 }}
            />
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;