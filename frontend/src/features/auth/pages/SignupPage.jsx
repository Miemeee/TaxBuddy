// src/pages/SignupPage.jsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import Logo from "../../../assets/logo.png";

import TermsDialog from "../components/legal/TermDialog";
import PrivacyDialog from "../components/legal/PrivacyDialog";
import SignupForm from "../components/form/SignupForm";

function SignupPage() {
  const { t } = useTranslation();

  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

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
        <Box
          sx={{
            maxWidth: 420,
            mx: "auto",
            textAlign: "center",
          }}
        >
          {/* TITLE */}
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            mb={3}
          >
            {t("auth.signup.title")}
          </Typography>

          <SignupForm
            onOpenTerms={() => setOpenTerms(true)}
            onOpenPrivacy={() => setOpenPrivacy(true)}
          />

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

      {/* POPUPS */}
      <TermsDialog
        open={openTerms}
        onClose={() => setOpenTerms(false)}
      />

      <PrivacyDialog
        open={openPrivacy}
        onClose={() => setOpenPrivacy(false)}
      />
    </Box>
  );
}

export default SignupPage;

