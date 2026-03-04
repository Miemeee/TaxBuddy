import express from "express";

import {
  getSimulationIncomes,
  getSimulationDeductions,
  calculateSimulation,
} from "../controllers/simulation.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/incomes", authMiddleware, getSimulationIncomes);

router.get("/deductions", authMiddleware, getSimulationDeductions);

router.post("/calculate", authMiddleware, calculateSimulation);

export default router;