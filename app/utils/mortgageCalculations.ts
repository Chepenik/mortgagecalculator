export interface AmortizationRow {
    month: number;
    payment: number;
    totalPayment: number;
    principal: number;
    interest: number;
    balance: number;
  }
  
  export const calculateMortgage = (principal: number, annualRate: number, years: number): number => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment;
  };
  
  export const generateAmortizationSchedule = (
    loanAmount: number,
    annualInterestRate: number,
    loanTermYears: number,
    propertyTax: number,
    homeInsurance: number
  ) => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const numPayments = loanTermYears * 12;
    const loanPayment = calculateMortgage(loanAmount, annualInterestRate, loanTermYears);
    let remainingBalance = loanAmount;
    let totalInterestPaid = 0;
    const schedule: AmortizationRow[] = [];
  
    const monthlyPropertyTax = propertyTax / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    const totalMonthlyPayment = loanPayment + monthlyPropertyTax + monthlyHomeInsurance;
  
    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = loanPayment - interestPayment;
      remainingBalance -= principalPayment;
      totalInterestPaid += interestPayment;
  
      if (month <= 4 || month > numPayments - 2 || month % 12 === 0) {
        schedule.push({
          month,
          payment: loanPayment,
          totalPayment: totalMonthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: remainingBalance,
        });
      }
    }
  
    return {
      schedule,
      loanPayment,
      totalMonthlyPayment,
      totalInterest: totalInterestPaid,
    };
  };