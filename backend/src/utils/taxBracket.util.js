
export const TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0 },        // 0% 150,000 (tax-free)
  { min: 150000, max: 300000, rate: 5 },   // 5% 150k-300k
  { min: 300000, max: 500000, rate: 10 },  // 10% 300k-500k
  { min: 500000, max: 750000, rate: 15 },  // 15% 500k-750k
  { min: 750000, max: 1000000, rate: 20 }, // 20% 750k-1M
  { min: 1000000, max: 2000000, rate: 25 },// 25% 1M-2M
  { min: 2000000, max: 5000000, rate: 30 },// 30% 2M-5M
  { min: 5000000, max: Infinity, rate: 35 }// 35% 5M+
];

/**
 * @param {Number} netIncome - Income after deductions
 * @returns {Number} Total tax 
 */
export const calculateByBracket = (netIncome) => {
  // up to 150,000 is tax-free
  if (netIncome <= 150000) return 0;

  // 150k-300k (income - 150k) × 5%
  if (netIncome <= 300000)
    return (netIncome - 150000) * 0.05;

  // 300k-500k 7,500 (cumulative from 150k-300k) + (income - 300k) × 10%
  if (netIncome <= 500000)
    return 7500 + (netIncome - 300000) * 0.10;

  // 500k-750k 27,500 + (income - 500k) × 15%
  if (netIncome <= 750000)
    return 27500 + (netIncome - 500000) * 0.15;

  // 750k-1M 65,000 + (income - 750k) × 20%
  if (netIncome <= 1000000)
    return 65000 + (netIncome - 750000) * 0.20;

  // 1M-2M 115,000 + (income - 1M) × 25%
  if (netIncome <= 2000000)
    return 115000 + (netIncome - 1000000) * 0.25;

  // 2M-5M 365,000 + (income - 2M) × 30%
  if (netIncome <= 5000000)
    return 365000 + (netIncome - 2000000) * 0.30;

  // 5M+ 1,265,000 + (income - 5M) × 35%
  return 1265000 + (netIncome - 5000000) * 0.35;
};