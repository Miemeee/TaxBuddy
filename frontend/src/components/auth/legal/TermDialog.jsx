import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function TermsDialog({ open, onClose }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t("auth.signup.termsTitle")}
      </DialogTitle>

      <DialogContent dividers>
        <Typography paragraph>
          {t("auth.policy.termsIntro")}
        </Typography>

        <Typography paragraph>• {t("auth.policy.terms1")}</Typography>
        <Typography paragraph>• {t("auth.policy.terms2")}</Typography>
        <Typography paragraph>• {t("auth.policy.terms3")}</Typography>
        <Typography paragraph>• {t("auth.policy.terms4")}</Typography>
        <Typography paragraph>• {t("auth.policy.terms5")}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t("auth.signup.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TermsDialog;