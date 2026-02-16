// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import OnboardingPage from "./pages/OnBoardingPage";
import OnboardingDetailsPage from "./pages/OnBoardingDetailsPage"
import SignupPage from "./features/auth/pages/SignupPage";
import LoginPage from "./features/auth/pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import SimulationPage from "./pages/SimulationPage";
import SimulationExpensePage from "./pages/SimulationExpensePage";
import SimulationResultPage from "./pages/SimulationResultPage";

// import CalculatorPage from "./pages/CalculatorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/onboarding-details" element={<OnboardingDetailsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route
          path="/simulation/expenses"
          element={<SimulationExpensePage />}
        />
        <Route path="/simulation/result" element={<SimulationResultPage />} />

        {/* <Route path="/calculator" element={<CalculatorPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
