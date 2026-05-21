import api from "../api/axios";

export const simulationService = {

  /**
   * Fetch list income
   * @param {Number} year - Tax year
   * @returns {Promise} income records
   */
  getIncomes: async (year) => {
    const res = await api.get(`/simulation/incomes?year=${year}`);
    return res.data.data;
  },

  /**
   * Fetch list deductions
   * @param {Number} year - Tax year
   * @returns {Promise} deduction records
   */
  getDeductions: async (year) => {
    const res = await api.get(`/simulation/deductions?year=${year}`);
    return res.data.data;
  },

  /**
   * Calculate tax
   * @param {Object} payload - { incomeIds: [], deductionIds: [], year }
   * @returns {Promise} Tax cal result
   */
  calculate: async (payload) => {
    const res = await api.post("/simulation/calculate", payload);
    return res.data;
  },
};