// src/pages/DashboardPage.jsx

import React, { useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useDashboard } from "./hooks/useDashboard";
import { useUserProfile } from "./hooks/useUserProfile";

import UserProfile from "./components/UserProfile";
import SummaryCard from "./components/SummaryCard";
import ActionCard from "./components/ActionCard";
import HistoryCard from "./components/HistoryCard";
import RecommendSection from "./components/RecommendSection";
import SimulationButton from "./components/SimulationButton";
import NavigationBar from "../components/BottomNavigationBar";
import TaxDetailDialog from "./components/TaxDetailDialog";

function DashboardPage() {
  const { t } = useTranslation();
  const { summary, history, recommended, loading, error } =
    useDashboard();

  const { username, initial } = useUserProfile();
  const [openDetail, setOpenDetail] = useState(false);

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
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
        <UserProfile username={username} initial={initial} />

        <Grid container spacing={5} mt={1}>
          {/* LEFT COLUMN */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <SummaryCard
              summary={summary}
              onOpenDetail={() => setOpenDetail(true)}
            />
            <SimulationButton />
            <HistoryCard history={history} />
          </Grid>

          {/* RIGHT COLUMN */}
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

            <RecommendSection data={recommended} />
          </Grid>
        </Grid>
      </Box>

      <TaxDetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        summary={summary}
      />

      <NavigationBar />
    </Box>
  );
}

export default DashboardPage;