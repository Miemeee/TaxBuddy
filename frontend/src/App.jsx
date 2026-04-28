// src/App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import WelcomePage from "./pages/WelcomePage";
import OnboardingPage from "./pages/OnBoardingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionPage from "./pages/TransactionPage";
import SimulationIncomePage from "./pages/simulation/SimulationIncomePage";
import SimulationDeductionPage from "./pages/simulation/SimulationDeduction";
import SimulationResultPage from "./pages/simulation/SimulationResultPage";
import ProfilePage from "./pages/ProfilePage";

import { SimulationProvider } from "./context/SimulationContext";
import LanguageSwitcher from "./components/common/LanguageSwitcher";

function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Box
          sx={{
            position: "fixed",
            top: 16,
            right: 16,
            zIndex: 9999,
          }}
        >
          <LanguageSwitcher />
        </Box>

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            path="/income"
            element={<TransactionPage type="income" />}
          />

          <Route
            path="/expense"
            element={<TransactionPage type="expense" />}
          />

          <Route
            path="/simulation/income"
            element={<SimulationIncomePage />}
          />

          <Route
            path="/simulation/deductions"
            element={<SimulationDeductionPage />}
          />

          <Route
            path="/simulation/result"
            element={<SimulationResultPage />}
          />

          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

      </BrowserRouter>
    </SimulationProvider>
  );
}

export default App;