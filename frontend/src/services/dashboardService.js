// src/pages/services/dashboardService.js

import axios from "../api/axios";

export const dashboardService = {
  /**
   * Get dashboard data 
   * @returns {Promise<Object>} Dashboard data
   * @throws {Error} data fails to load
   */
  async getDashboard() {
    // Use current year
    const year = new Date().getFullYear();

    // Fetch data
    const res = await axios.get("/dashboard", {
      params: { year },
    });

    // Validate response
    if (!res.data?.success) {
      throw new Error("Failed to load dashboard");
    }

    return res.data;
  },
};