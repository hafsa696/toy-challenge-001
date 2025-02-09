function calculateNetSalary(basicSalary, benefits) {
    // Define NHIF, NSSF, and KRA PAYE brackets
    const NHIF_RATES = [
      { min: 0, max: 5999, deduction: 150 },
      { min: 6000, max: 7999, deduction: 300 },
      { min: 8000, max: 11999, deduction: 400 },
      { min: 12000, max: 14999, deduction: 500 },
      { min: 15000, max: 19999, deduction: 600 },
      { min: 20000, max: 24999, deduction: 750 },
      { min: 25000, max: 29999, deduction: 850 },
      { min: 30000, max: 34999, deduction: 900 },
      { min: 35000, max: 39999, deduction: 950 },
      { min: 40000, max: 44999, deduction: 1000 },
      { min: 45000, max: 49999, deduction: 1100 },
      { min: 50000, max: 59999, deduction: 1200 },
      { min: 60000, max: 69999, deduction: 1300 },
      
    ];
  
    const PAYE_RATES = [
      { min: 0, max: 24000, rate: 0.1 },
      { min: 24001, max: 32333, rate: 0.25 },
      
    ];
  
    const NSSF_RATE = 0.06; // 6% of gross salary capped
    const NSSF_CAP = 1800; // Max deduction for NSSF
  
    // Step 1: Calculate Gross Salary
    const grossSalary = basicSalary + benefits;
  
    // Step 2: Calculate PAYE
    let taxableIncome = grossSalary;
    let paye = 0;
    for (const bracket of PAYE_RATES) {
      if (taxableIncome > bracket.min) {
        const taxableAmount = Math.min(bracket.max, taxableIncome) - bracket.min;
        paye += taxableAmount * bracket.rate;
      }
    }
  
    // Step 3: Calculate NHIF
    const nhif = NHIF_RATES.find(
      (bracket) => grossSalary >= bracket.min && grossSalary <= bracket.max
    ).deduction;
  
    // Step 4: Calculate NSSF
    const nssf = Math.min(grossSalary * NSSF_RATE, NSSF_CAP);
  
    // Step 5: Calculate Net Salary
    const totalDeductions = paye + nhif + nssf;
    const netSalary = grossSalary - totalDeductions;
  
    // Return a breakdown
    return {
      grossSalary,
      paye: paye.toFixed(2),
      nhif,
      nssf: nssf.toFixed(2),
      netSalary: netSalary.toFixed(2),
    };
  }
  
  // Example usage
  const basicSalary = 70000; // Input basic salary
  const benefits = 15000; // Input benefits
  
  const salaryDetails = calculateNetSalary(basicSalary, benefits);
  console.log("Salary Breakdown:", salaryDetails);
  