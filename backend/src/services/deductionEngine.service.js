/**
 * @param {Object} profile - User profile
 * @param {Number} year - Tax year
 * @returns {Array} Array of available deduction
 */
export const generateDeductions = (profile, year) => {
  const deductions = [];

  // spouse 60,000  if married
  if (profile.maritalStatus === "married") {
    deductions.push({
      deduction_id: 1,
      tax_year: year,
      amount_claimed: 60000,
    });
  }

  // children: 30,000 per child
  if (profile.hasChildren === "yes") {
    deductions.push({
      deduction_id: 2,
      tax_year: year,
      amount_claimed: 30000,
    });
  }

  // parents 30,000 
  if (profile.supportsParents === "yes") {
    deductions.push({
      deduction_id: 3,
      tax_year: year,
      amount_claimed: 30000,
    });
  }

  // disabled person 60,000 
  if (profile.isDisabled === "yes") {
    deductions.push({
      deduction_id: 4,
      tax_year: year,
      amount_claimed: 60000,
    });
  }

  return deductions;
};