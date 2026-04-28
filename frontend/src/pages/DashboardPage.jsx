// src/pages/DashboardPage.jsx

import React, { useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

import { useDashboard } from "../hooks/useDashboard";

import UserProfile from "../components/dashboard/UserProfile";
import SummaryCard from "../components/dashboard/SummaryCard";
import ActionCard from "../components/dashboard/ActionCard";
import HistoryCard from "../components/dashboard/HistoryCard";
import RecommendSection from "../components/dashboard/RecommendSection";
import SimulationButton from "../components/dashboard/SimulationButton";
import NavigationBar from "../components/common/BottomNavigationBar";
import TaxDetailDialog from "../components/dashboard/TaxDetailDialog";
import AutoNotification from "../components/dashboard/AutoNotification";

function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    summary,
    history,
    deductions,
    notifications,
    loading,
    error,
    fetchDashboard
  } = useDashboard();

  const [openDetail, setOpenDetail] = useState(false);

  const hasIncome = history?.some((item) => item.type === "income");

  if (user && !user.hasOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <>
      {loading && (
        <Box p={4} textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Box p={4} textAlign="center">
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {!loading && !error && (
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              flex: 1,
              width: "100%",
              px: { xs: 2, sm: 4, md: 6, lg: 12 },
              py: 4,
              pb: 12,
            }}
          >
            <UserProfile />

            <Grid container spacing={5} mt={1}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <SummaryCard
                  summary={summary}
                  onOpenDetail={() => setOpenDetail(true)}
                />

                {hasIncome && <SimulationButton />}

                <HistoryCard
                  history={history}
                  onUpdated={fetchDashboard}
                />
              </Grid>

              <Grid size={{ xs: 12, lg: 6 }}>
                <Box mt={4}>
                  <Typography variant="h6" mb={2}>
                    {t("dashboard.selectRecord")}
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={6}>
                      <ActionCard type="income" />
                    </Grid>

                    <Grid size={6}>
                      <ActionCard type="expense" />
                    </Grid>
                  </Grid>
                </Box>

                <RecommendSection deductions={deductions} />
              </Grid>
            </Grid>
          </Box>

          <TaxDetailDialog
            open={openDetail}
            onClose={() => setOpenDetail(false)}
            summary={summary}
          />

          <AutoNotification notifications={notifications} />
          <NavigationBar notifications={notifications} />
        </Box>
      )}
    </>
  );
}

export default DashboardPage;