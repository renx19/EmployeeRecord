const salaryGrades = [
    { grade: 1, amount: 20000 },
    { grade: 2, amount: 30000 },
    { grade: 3, amount: 40000 },
    { grade: 4, amount: 50000 },
    // Add more grades and amounts as needed
  ];
  
  const calculateSalary = (grade, baseAmount = 20000, increment = 10000) => {
    return baseAmount + (grade - 1) * increment;
  };
  
  const calculateDeductions = (salary, taxRate = 0.20, sssDeduction = 1500) => {
    const tax = salary * taxRate;
    const sss = sssDeduction;
    // Add more deductions as needed
    return { tax, sss };
  };
  
  export { salaryGrades, calculateSalary, calculateDeductions };
  