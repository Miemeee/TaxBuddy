import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userDeductionRoutes from "./routes/userDeduction.routes.js";
import taxRoutes from "./routes/tax.routes.js";
import taxRecordRoutes from "./routes/taxRecord.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import simulationRoutes from "./routes/simulation.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user-deductions", userDeductionRoutes);
app.use("/api/tax", taxRoutes);
app.use("/api/tax-records", taxRecordRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/simulation", simulationRoutes);

app.get("/", (req, res) => {
  res.send("TaxBuddy Backend Running");
});

app.use(errorMiddleware);

export default app;