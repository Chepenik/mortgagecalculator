export interface AmortizationRow {
  month: number;
  payment: number;
  totalPayment: number;
  principalPayment: number;
  interestPayment: number;
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
  homeInsurance: number,
  hoa: number,
  extraPayment: number = 0
) => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const numPayments = loanTermYears * 12;
  const loanPayment = calculateMortgage(loanAmount, annualInterestRate, loanTermYears);
  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  const schedule: AmortizationRow[] = [];
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyHomeInsurance = homeInsurance / 12;
  const totalMonthlyPayment = loanPayment + monthlyPropertyTax + monthlyHomeInsurance + hoa + extraPayment;
  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    let principalPayment = loanPayment - interestPayment + extraPayment;
    if (principalPayment > remainingBalance) {
      principalPayment = remainingBalance;
    }
    remainingBalance -= principalPayment;
    totalInterestPaid += interestPayment;
    if (month <= 4 || month > numPayments - 2 || month % 12 === 0 || remainingBalance <= 0) {
      schedule.push({
        month,
        payment: loanPayment + extraPayment,
        totalPayment: totalMonthlyPayment,
        principalPayment,
        interestPayment,
        balance: remainingBalance,
      });
    }
    if (remainingBalance <= 0) break;
  }
  return {
    schedule,
    loanPayment,
    totalMonthlyPayment,
    totalInterest: totalInterestPaid,
  };
};
export const calculateTotalCostOfOwnership = (
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  propertyTax: number,
  homeInsurance: number,
  hoa: number,
  homeAppreciationRate: number,
  downPayment: number,
  additionalCosts: { name: string; value: number }[],
  extraPayment: number = 0
): { totalCost: number; netCost: number; actualLoanTermYears: number } => {
  const { schedule, totalInterest } = generateAmortizationSchedule(
    loanAmount,
    annualInterestRate,
    loanTermYears,
    propertyTax,
    homeInsurance,
    hoa,
    extraPayment
  );
  const lastEntry = schedule[schedule.length - 1];
  const actualLoanTermMonths = lastEntry.month;
  const actualLoanTermYears = actualLoanTermMonths / 12;
  const totalPayments = loanAmount + totalInterest;
  const totalTax = propertyTax * actualLoanTermYears;
  const totalInsurance = homeInsurance * actualLoanTermYears;
  const totalHoa = hoa * 12 * actualLoanTermYears;
  const totalAdditionalCosts = additionalCosts.reduce((sum, cost) => sum + cost.value * 12 * actualLoanTermYears, 0);
  const totalCost = totalPayments + totalTax + totalInsurance + totalHoa + totalAdditionalCosts;
  const initialHomeValue = loanAmount + downPayment;
  const appreciatedHomeValue = initialHomeValue * Math.pow(1 + homeAppreciationRate / 100, actualLoanTermYears);
  const netCost = totalCost - (appreciatedHomeValue - initialHomeValue);
  return { totalCost, netCost, actualLoanTermYears };
};