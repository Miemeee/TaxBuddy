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
  `${Number(num).toLocaleString("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ฿`;

const calculateTaxBreakdown = (income) => {
  const brackets = [
    { limit: 150000, rate: 0 },
    { limit: 300000, rate: 0.05 },
    { limit: 500000, rate: 0.10 },
    { limit: 750000, rate: 0.15 },
    { limit: 1000000, rate: 0.20 },
    { limit: 2000000, rate: 0.25 },
    { limit: 5000000, rate: 0.30 },
    { limit: Infinity, rate: 0.35 },
  ];

  let previousLimit = 0;
  let remainingIncome = income;
  const result = [];

  for (let bracket of brackets) {
    if (remainingIncome <= 0) break;

    const taxableInBracket =
      Math.min(bracket.limit - previousLimit, remainingIncome);

    const tax = taxableInBracket * bracket.rate;

    result.push({
      from: previousLimit,
      to: bracket.limit,
      rate: bracket.rate,
      amount: taxableInBracket,
      tax,
    });

    remainingIncome -= taxableInBracket;
    previousLimit = bracket.limit;
  }

  return result;
};

function TaxDetailDialog({ open, onClose, summary }) {
  const { t } = useTranslation();

  if (!summary) return null;

  const totalDeduction =
    summary.totalDeduction ?? summary.taxDeduction ?? 0;

  const taxableIncome = summary.taxableIncome ?? 0;

  const taxTotal = summary.taxTotal ?? 0;
  const taxPayable = summary.taxPayable ?? 0;

  const taxSaved = taxTotal - taxPayable;

  const breakdown = calculateTaxBreakdown(taxableIncome);

  console.log("Summary in Dialog:", summary);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {t("dashboard.taxDetailTitle")}
      </DialogTitle>

      <DialogContent dividers>

        <Typography fontWeight={600} mb={1}>
          {t("dashboard.summaryincome")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">
            {t("dashboard.incomeSummaryTitle")}
          </Typography>
          <Typography fontWeight={600}>
            {formatCurrency(summary.totalIncome)}
          </Typography>
        </Box>

        <Typography fontWeight={600} mb={1}>
          {t("dashboard.minusexpense")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">
            {t("dashboard.expenseSummary")}
          </Typography>
          <Typography fontWeight={600}>
            - {formatCurrency(summary.taxExpense)}
          </Typography>
        </Box>

        <Typography fontWeight={600} mb={1}>
          {t("dashboard.incomeafterminusexpense")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">
            {t("dashboard.incomeafterminusexpensesum")}
          </Typography>
          <Typography fontWeight={600}>
            {formatCurrency(summary.incomeAfterExpense)}
          </Typography>
        </Box>

        <Typography fontWeight={600} mb={1}>
          {t("dashboard.minusdeduction")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">
            {t("dashboard.deductionSummary")}
          </Typography>
          <Typography fontWeight={600}>
            - {formatCurrency(totalDeduction)}
          </Typography>
        </Box>

        <Typography fontWeight={600} mb={1}>
          {t("dashboard.lastincome")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">
            {t("dashboard.taxableIncome")}
          </Typography>
          <Typography fontWeight={600}>
            {formatCurrency(taxableIncome)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={700} mt={3} mb={1}>
          {t("dashboard.taxcalculate")}
        </Typography>

        {breakdown.map((b, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            mb={1}
          >
            <Typography fontSize="0.85rem" color="text.secondary">
              {b.from.toLocaleString("th-TH")} -
              {b.to === Infinity
                ? ` ${t("dashboard.up")}`
                : ` ${b.to.toLocaleString("th-TH")}`} {t("dashboard.baht")}
              ({b.rate * 100}%)
            </Typography>

            <Typography fontSize="0.85rem" fontWeight={600}>
              {formatCurrency(b.tax)}
            </Typography>
          </Box>
        ))}

        <Typography fontWeight={600} mb={1}>
          {t("dashboard.taxbeforeminusdeduction")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">
            {t("dashboard.taxTotal")}
          </Typography>
          <Typography fontWeight={600}>
            {formatCurrency(taxTotal)}
          </Typography>
        </Box>

        <Typography fontWeight={700} mb={1}>
          {t("dashboard.taxpayable")}
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">
            {t("dashboard.taxPayable")}
          </Typography>
          <Typography fontWeight={800} color="primary.main">
            {formatCurrency(taxPayable)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight={600}>
            {t("dashboard.safepay")}
          </Typography>
          <Typography fontWeight={700} color="success.main">
            {formatCurrency(taxSaved)}
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: "primary.light",
            p: 2,
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Typography fontSize="0.8rem">
            {t("dashboard.taxcaldes")}
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