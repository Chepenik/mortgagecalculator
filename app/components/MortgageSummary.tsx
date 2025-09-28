import React from 'react';

interface AdditionalCost {
  name: string;
  value: number;
}

interface MortgageSummaryProps {
  principal: number;
  loanPayment: number;
  totalMonthlyPayment: number;
  totalInterest: number;
  totalCostOfOwnership: number;
  downPayment: number;
  homePrice: number;
  additionalCosts: AdditionalCost[];
}

const MortgageSummary: React.FC<MortgageSummaryProps> = ({
  principal,
  loanPayment,
  totalMonthlyPayment,
  totalInterest,
  totalCostOfOwnership,
  downPayment,
  homePrice,
  additionalCosts
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
        Mortgage Summary
      </h2>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Home Price: {formatCurrency(homePrice)}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Down Payment: {formatCurrency(downPayment)}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Principal Loan Amount: {formatCurrency(principal)}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Monthly P&I Payment: {formatCurrency(loanPayment)}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Total Monthly Payment: {formatCurrency(totalMonthlyPayment)}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Total Interest Paid: {formatCurrency(totalInterest)}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Total Amount Paid not including down payment: {formatCurrency(principal + totalInterest)}
      </p>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Total Cost of Ownership Over 30 years: {formatCurrency(totalCostOfOwnership)}
      </p>
      {additionalCosts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
            Additional Costs:
          </h3>
          <ul>
            {additionalCosts.map((cost, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {cost.name}: {formatCurrency(cost.value)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MortgageSummary;