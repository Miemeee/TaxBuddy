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

function PrivacyDialog({ open, onClose }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t("auth.signup.privacyTitle")}
      </DialogTitle>

      <DialogContent dividers>
        <Typography paragraph>
          {t("auth.policy.privacyIntro")}
        </Typography>

        <Typography paragraph>• {t("auth.policy.privacy1")}</Typography>
        <Typography paragraph>• {t("auth.policy.privacy2")}</Typography>
        <Typography paragraph>• {t("auth.policy.privacy3")}</Typography>
        <Typography paragraph>• {t("auth.policy.privacy4")}</Typography>
        <Typography paragraph>• {t("auth.policy.privacy5")}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {t("auth.signup.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PrivacyDialog;