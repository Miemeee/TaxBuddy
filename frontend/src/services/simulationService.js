import api from "../api/axios";

export const simulationService = {

  getIncomes: async (year) => {
    const res = await api.get(`/simulation/incomes?year=${year}`);
    return res.data.data;
  },

  getDeductions: async (year) => {
    const res = await api.get(`/simulation/deductions?year=${year}`);
    return res.data.data;
  },

  calculate: async (payload) => {
    const res = await api.post("/simulation/calculate", payload);
    return res.data;
  },
};