import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
interface LoanBalanceChartDataProps {
  data: {
    year: number;
    balance: number;
  }[];
  principal: number;
  height?: number;
  loanTermYears: number;
  extraPayment: number;
}
const LoanBalanceChart: React.FC<LoanBalanceChartDataProps> = ({ data, principal, height = 400, loanTermYears, extraPayment }) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
  };
  const sanitizeData = (data: { year: number; balance: number }[]): { year: number; balance: number }[] => 
    data.map(entry => ({
      ...entry,
      balance: Math.max(entry.balance, 0)
    }));
  const sanitizedData = sanitizeData(data);
  const fullData = [{ year: 0, balance: principal }];
  for (let year = 1; year <= loanTermYears; year++) {
    const existingData = sanitizedData.find(d => d.year === year);
    if (existingData) {
      fullData.push(existingData);
    } else {
      fullData.push({ year, balance: 0 });
    }
  }
  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;
    const balance = payload[0].value as number;
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p className="text-gray-700 dark:text-gray-300 font-bold">{`Year: ${label}`}</p>
        <p className="text-yellow-600">{`Balance: ${formatCurrency(balance)}`}</p>
      </div>
    );
  };
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart 
        data={fullData} 
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis 
          dataKey="year" 
          label={{ value: "Year", position: "insideBottom", offset: -10 }}
          tick={{ fontSize: 12 }}
          domain={[0, loanTermYears]}
          ticks={Array.from({ length: loanTermYears + 1 }, (_, i) => i)}
        />
        <YAxis
          label={{
            value: "Balance",
            angle: -90,
            position: "insideLeft",
            offset: -5
          }}
          tickFormatter={formatCurrency}
          tick={{ fontSize: 12 }}
          width={80}
          domain={[0, 'dataMax']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: "20px" }} />
        <Line 
          type="monotone" 
          dataKey="balance" 
          name="Loan Balance" 
          stroke="#ffc658" 
          strokeWidth={2} 
          dot={{ r: 4, stroke: '#ffc658', strokeWidth: 1.5 }}
          activeDot={{ r: 6, stroke: '#ffa000', strokeWidth: 2 }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LoanBalanceChart;