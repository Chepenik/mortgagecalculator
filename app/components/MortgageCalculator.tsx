import React, { useState } from 'react';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import InputField from './InputField';
import { AmortizationRow, calculateMortgage, generateAmortizationSchedule } from '../utils/mortgageCalculations';

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(250000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(6.25);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTax, setPropertyTax] = useState<number>(4200);
  const [homeInsurance, setHomeInsurance] = useState<number>(2000);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [loanPayment, setLoanPayment] = useState<number>(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const handleCalculate = () => {
    const { schedule, loanPayment, totalMonthlyPayment, totalInterest } = generateAmortizationSchedule(
      loanAmount,
      annualInterestRate,
      loanTermYears,
      propertyTax,
      homeInsurance
    );
    setAmortizationSchedule(schedule);
    setLoanPayment(loanPayment);
    setTotalMonthlyPayment(totalMonthlyPayment);
    setTotalInterest(totalInterest);
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <InputField
          icon={<DollarSign className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          step={1000}
        />
        <InputField
          icon={<Percent className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
          label="Annual Interest Rate"
          value={annualInterestRate}
          onChange={setAnnualInterestRate}
          step={0.1}
        />
        <InputField
          icon={<Calendar className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
          label="Loan Term (Years)"
          value={loanTermYears}
          onChange={setLoanTermYears}
        />
        <InputField
          icon={<DollarSign className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
          label="Annual Property Tax"
          value={propertyTax}
          onChange={setPropertyTax}
          step={100}
        />
        <InputField
          icon={<DollarSign className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
          label="Annual Home Insurance"
          value={homeInsurance}
          onChange={setHomeInsurance}
          step={100}
        />
        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Summary</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Loan Amount: {formatCurrency(loanAmount)}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Loan Payment: {formatCurrency(loanPayment)}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Total Monthly Payment: {formatCurrency(totalMonthlyPayment)}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Total Interest Paid: {formatCurrency(totalInterest)}</p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Total Amount Paid: {formatCurrency(loanAmount + totalInterest)}</p>
      </div>

      {amortizationSchedule.length > 0 && (
        <div className="col-span-2 mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Amortization Schedule</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-orange-200 dark:bg-orange-800 font-bold uppercase text-sm text-orange-800 dark:text-orange-100 border-b border-orange-300 dark:border-orange-700">Month</th>
                <th className="py-2 px-4 bg-orange-200 dark:bg-orange-800 font-bold uppercase text-sm text-orange-800 dark:text-orange-100 border-b border-orange-300 dark:border-orange-700">Loan Payment</th>
                <th className="py-2 px-4 bg-orange-200 dark:bg-orange-800 font-bold uppercase text-sm text-orange-800 dark:text-orange-100 border-b border-orange-300 dark:border-orange-700">Total Payment</th>
                <th className="py-2 px-4 bg-orange-200 dark:bg-orange-800 font-bold uppercase text-sm text-orange-800 dark:text-orange-100 border-b border-orange-300 dark:border-orange-700">Principal</th>
                <th className="py-2 px-4 bg-orange-200 dark:bg-orange-800 font-bold uppercase text-sm text-orange-800 dark:text-orange-100 border-b border-orange-300 dark:border-orange-700">Interest</th>
                <th className="py-2 px-4 bg-orange-200 dark:bg-orange-800 font-bold uppercase text-sm text-orange-800 dark:text-orange-100 border-b border-orange-300 dark:border-orange-700">Balance</th>
              </tr>
            </thead>
            <tbody>
              {amortizationSchedule.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-orange-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}>
                  <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{row.month}</td>
                  <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.payment)}</td>
                  <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.totalPayment)}</td>
                  <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.principal)}</td>
                  <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.interest)}</td>
                  <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;