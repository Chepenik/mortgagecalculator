import React from 'react';

interface AmortizationRow {
  year: number;
  balance: number;
  principalPaid: number;
  interestPaid: number;
  homeValue: number;
  equity: number;
}

interface AdditionalCost {
  name: string;
  value: number;
}

interface AmortizationScheduleProps {
  data: AmortizationRow[];
  homePrice: number;
  downPayment: number;
  propertyTax: number;
  homeInsurance: number;
  hoa: number;
  appreciationRate: number;
  loanPayment: number;
  additionalCosts: AdditionalCost[];
  totalMonthlyPayment: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
};

const TableHeader: React.FC = () => (
  <thead>
    <tr>
      {['Year', 'Balance', 'Principal Paid', 'Interest Paid', 'Home Value', 'Equity', 'Total Monthly Payment'].map((header) => (
        <th key={header} className="py-2 px-4 bg-orange-200 dark:bg-orange-800 font-bold uppercase text-sm text-orange-800 dark:text-orange-100 border-b border-orange-300 dark:border-orange-700">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const TableRow: React.FC<{ row: AmortizationRow; index: number; totalMonthlyPayment: number }> = ({ row, index, totalMonthlyPayment }) => {
  const equityPercentage = (row.equity / row.homeValue) * 100;
  return (
    <tr className={index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
      <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{row.year}</td>
      <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.balance)}</td>
      <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.principalPaid)}</td>
      <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.interestPaid)}</td>
      <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(row.homeValue)}</td>
      <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">
        {formatCurrency(row.equity)} ({formatPercentage(equityPercentage / 100)})
      </td>
      <td className="py-2 px-4 border-b border-orange-200 dark:border-orange-900 text-gray-800 dark:text-gray-200">{formatCurrency(totalMonthlyPayment)}</td>
    </tr>
  );
};

const MonthlyPaymentBreakdown: React.FC<Pick<AmortizationScheduleProps, 'loanPayment' | 'propertyTax' | 'homeInsurance' | 'hoa' | 'additionalCosts' | 'totalMonthlyPayment'>> = 
  ({ loanPayment, propertyTax, homeInsurance, hoa, additionalCosts, totalMonthlyPayment }) => (
  <div className="mt-4">
    <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">Monthly Payment Breakdown</h3>
    <ul>
      <li>Principal & Interest: {formatCurrency(loanPayment)}</li>
      <li>Property Tax: {formatCurrency(propertyTax / 12)}</li>
      <li>Home Insurance: {formatCurrency(homeInsurance / 12)}</li>
      <li>HOA: {formatCurrency(hoa)}</li>
      {additionalCosts.map((cost, index) => (
        <li key={index}>{cost.name}: {formatCurrency(cost.value)}</li>
      ))}
      <li className="font-bold">Total Monthly Payment: {formatCurrency(totalMonthlyPayment)}</li>
    </ul>
  </div>
);

const AmortizationSchedule: React.FC<AmortizationScheduleProps> = ({
  data,
  loanPayment,
  propertyTax,
  homeInsurance,
  hoa,
  additionalCosts,
  totalMonthlyPayment
}) => {
  return (
    <div className="col-span-2 mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Amortization Schedule</h2>
      <table className="w-full text-left border-collapse">
        <TableHeader />
        <tbody>
          {data.map((row, index) => (
            <TableRow key={index} row={row} index={index} totalMonthlyPayment={totalMonthlyPayment} />
          ))}
        </tbody>
      </table>
      <MonthlyPaymentBreakdown 
        loanPayment={loanPayment}
        propertyTax={propertyTax}
        homeInsurance={homeInsurance}
        hoa={hoa}
        additionalCosts={additionalCosts}
        totalMonthlyPayment={totalMonthlyPayment}
      />
    </div>
  );
};

export default AmortizationSchedule;