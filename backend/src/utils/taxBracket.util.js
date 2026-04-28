export const TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0 },
  { min: 150000, max: 300000, rate: 5 },
  { min: 300000, max: 500000, rate: 10 },
  { min: 500000, max: 750000, rate: 15 },
  { min: 750000, max: 1000000, rate: 20 },
  { min: 1000000, max: 2000000, rate: 25 },
  { min: 2000000, max: 5000000, rate: 30 },
  { min: 5000000, max: Infinity, rate: 35 }
];

export const calculateByBracket = (netIncome) => {
  if (netIncome <= 150000) return 0;

  if (netIncome <= 300000)
    return (netIncome - 150000) * 0.05;

  if (netIncome <= 500000)
    return 7500 + (netIncome - 300000) * 0.10;

  if (netIncome <= 750000)
    return 27500 + (netIncome - 500000) * 0.15;

  if (netIncome <= 1000000)
    return 65000 + (netIncome - 750000) * 0.20;

  if (netIncome <= 2000000)
    return 115000 + (netIncome - 1000000) * 0.25;

  if (netIncome <= 5000000)
    return 365000 + (netIncome - 2000000) * 0.30;

  return 1265000 + (netIncome - 5000000) * 0.35;
};