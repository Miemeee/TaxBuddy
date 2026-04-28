export function formatAmount(num) {
  return `+ ฿${num.toLocaleString("th-TH", {
    minimumFractionDigits: 2,
  })}`;
}