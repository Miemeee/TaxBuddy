// src/pages/services/dashboardService.js

import axios from "../api/axios";

export const dashboardService = {
  async getDashboard() {
    const year = new Date().getFullYear();

    const res = await axios.get("/dashboard", {
      params: { year },
    });

    if (!res.data?.success) {
      throw new Error("Failed to load dashboard");
    }

    return res.data;
  },
};