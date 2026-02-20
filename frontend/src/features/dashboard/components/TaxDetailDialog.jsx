// src/pages/components/TaxDetailDialog.jsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const formatCurrency = (num = 0) =>
  `฿${num.toLocaleString("th-TH")}`;

function TaxDetailDialog({ open, onClose, summary }) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {t("dashboard.taxDetailTitle")}
      </DialogTitle>

      <DialogContent dividers>

        {!summary ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">
                {t("dashboard.incomeSummaryTitle")}
              </Typography>
              <Typography fontWeight={600}>
                ฿{summary.totalIncome.toLocaleString("th-TH")}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">
                {t("dashboard.expenseSummaryTitle")}
              </Typography>
              <Typography fontWeight={600}>
                ฿{summary.totalExpense.toLocaleString("th-TH")}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="text.secondary">
                {t("dashboard.taxTotal")}
              </Typography>
              <Typography fontWeight={600}>
                ฿{summary.taxTotal.toLocaleString("th-TH")}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography color="text.secondary">
                {t("dashboard.taxPayable")}
              </Typography>
              <Typography fontWeight={700} color="primary.main">
                ฿{summary.taxPayable.toLocaleString("th-TH")}
              </Typography>
            </Box>
          </>
        )}

        <Box
          sx={{
            bgcolor: "primary.light",
            p: 2,
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Typography fontSize={13}>
            {t("dashboard.condition")}
          </Typography>
        </Box>

      </DialogContent>

      <DialogActions>
        <Button variant="contained" fullWidth onClick={onClose}>
          {t("dashboard.closeDialog")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default TaxDetailDialog;