/**
 * @param {Number} num 
 * @returns {String} 
 */
export function formatAmount(num) {
  return `+ ฿${num.toLocaleString("th-TH", {
    minimumFractionDigits: 2, 
  })}`;
}