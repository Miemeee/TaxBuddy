import axios from "../api/axios";

export const transactionService = {

  /**
   * Fetch all transactions 
   * @param {Number} year - Tax year
   * @returns {Promise<Array>} List of transactions
   */
  async getByYear(year) {
    const res = await axios.get("/transactions", {
      params: { year },
    });
    return res.data.data;
  },

  /**
   * Create a new transaction
   * @param {Object} data - Transaction data
   * @returns {Promise<Object>} Created transaction
   */
  async create(data) {
    if (data instanceof FormData) {
      const res = await axios.post("/transactions", data);
      return res.data.data;
    }

    const res = await axios.post("/transactions", data);
    return res.data.data;
  },

  /**
   * Update an existing transaction
   * @param {Number} id - Transaction ID
   * @param {Object} data - Updated transaction data
   * @returns {Promise<Object>} Updated transaction
   */
  async update(id, data) {
    const res = await axios.put(`/transactions/${id}`, data);
    return res.data.data;
  },

  /**
   * Delete a transaction
   * @param {Number} id - Transaction ID
   * @returns {Promise<Object>} Deletion response
   */
  async remove(id) {
    const res = await axios.delete(`/transactions/${id}`);
    return res.data;
  },
};