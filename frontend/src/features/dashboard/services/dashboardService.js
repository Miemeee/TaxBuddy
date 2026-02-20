// src/pages/services/dashboardService.js

const delay = (data, time = 300) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(data), time)
  );

const mockSummary = {
  totalIncome: 123456,
  totalExpense: 123456,
  taxTotal: 1234,
  taxDeduction: 123,
  allowedExpense: 123,
  taxPayable: 888,
};

const mockHistory = [
  {
    id: 1,
    title: "รายได้จาก livestream ใน Tiktok",
    date: "Mar 21, 2019",
    amount: 2500,
    type: "income",
  },
  {
    id: 2,
    title: "ค่าใช้จ่าย สำหรับ Tiktok Live",
    date: "Mar 21, 2019",
    amount: -800,
    type: "expense",
  },
];

const mockRecommended = [
  { id: 1, label: "ค่าลดหย่อนเพื่อดูแลบุตร", amount: 250 },
  { id: 2, label: "ค่าลดหย่อนเพื่อดูแลบิดา", amount: 250 },
    { id: 3, label: "ค่าลดหย่อนเพื่อดูแลบิดา", amount: 250 },
];

export const dashboardService = {

  async getSummary() {
    // อนาคต:
    // return api.get("/dashboard/summary");
    return delay(mockSummary);
  },

  async getHistory() {
    return delay(mockHistory);
  },

  async getRecommended() {
    return delay(mockRecommended);
  },

};