export const generateDeductions = (profile, year) => {
  const deductions = [];

  // คู่สมรส
  if (profile.maritalStatus === "married") {
    deductions.push({
      deduction_id: 1,
      tax_year: year,
      amount_claimed: 60000,
    });
  }

  // บุตร
  if (profile.hasChildren === "yes") {
    deductions.push({
      deduction_id: 2,
      tax_year: year,
      amount_claimed: 30000,
    });
  }

  // พ่อแม่
  if (profile.supportsParents === "yes") {
    deductions.push({
      deduction_id: 3,
      tax_year: year,
      amount_claimed: 30000,
    });
  }

  // ผู้พิการ
  if (profile.isDisabled === "yes") {
    deductions.push({
      deduction_id: 4,
      tax_year: year,
      amount_claimed: 60000,
    });
  }

  return deductions;
};