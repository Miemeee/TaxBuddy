import axios from "../api/axios";

export const transactionService = {

  async getByYear(year) {
    const res = await axios.get("/transactions", {
      params: { year },
    });
    return res.data.data;
  },

  async create(data) {
    const res = await axios.post("/transactions", data);
    return res.data.data;
  },

  async update(id, data) {
    const res = await axios.put(`/transactions/${id}`, data);
    return res.data.data;
  },

  async remove(id) {
    const res = await axios.delete(`/transactions/${id}`);
    return res.data;
  },
};