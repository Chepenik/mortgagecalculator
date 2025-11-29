import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface BitcoinWealthComparisonChartProps {
  downPayment: number;
  yearlyData: {
    year: number;
    equity?: number;
    principalPaid?: number;
  }[];
  bitcoinPrice: number | null;
  loanTermYears: number;
}

const BitcoinWealthComparisonChart: React.FC<BitcoinWealthComparisonChartProps> = ({
  downPayment,
  yearlyData,
  bitcoinPrice,
  loanTermYears,
}) => {
  // Conservative annual Bitcoin growth rate (30% - historical average is higher but more realistic)
  const BITCOIN_ANNUAL_GROWTH = 0.30;

  // Calculate comparison data
  const comparisonData = useMemo(() => {
    // Edge case: no down payment
    if (downPayment <= 0 || !bitcoinPrice) {
      return [];
    }

    // Calculate Bitcoin purchased
    const bitcoinPurchased = downPayment / bitcoinPrice;

    // Generate yearly projection
    const data = [];

    // Year 0: Initial investment
    data.push({
      year: 0,
      homeEquity: 0,
      bitcoinValue: downPayment,
      bitcoinLabel: `$${downPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      homeEquityLabel: '$0',
    });

    // Years 1 through loan term
    for (let year = 1; year <= loanTermYears; year++) {
      // Home equity: use equity or principalPaid field
      const homeEquityEntry = yearlyData.find(d => d.year === year);
      const homeEquity = homeEquityEntry ? (homeEquityEntry.equity || homeEquityEntry.principalPaid || 0) : 0;

      // Bitcoin value: compound growth at BITCOIN_ANNUAL_GROWTH rate
      const bitcoinValue = downPayment * Math.pow(1 + BITCOIN_ANNUAL_GROWTH, year);

      data.push({
        year,
        homeEquity: Math.max(homeEquity, 0),
        bitcoinValue,
        bitcoinLabel: `$${bitcoinValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
        homeEquityLabel: `$${homeEquity.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
      });
    }

    return data;
  }, [downPayment, yearlyData, bitcoinPrice, loanTermYears]);

  // Edge case: no data to display
  if (comparisonData.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
          Add a down payment to see Bitcoin wealth comparison
        </p>
      </div>
    );
  }

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

  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) return null;

    const data = payload[0].payload;
    const isBitcoin = payload[0].dataKey === 'bitcoinValue';

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg border border-orange-300 dark:border-orange-500">
        <p className="text-gray-700 dark:text-gray-300 font-bold mb-2">{`Year ${data.year}`}</p>
        <p className={`font-semibold ${isBitcoin ? 'text-orange-600' : 'text-blue-600'}`}>
          {isBitcoin ? '₿ Bitcoin Value' : '🏠 Home Equity'}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          {isBitcoin ? data.bitcoinLabel : data.homeEquityLabel}
        </p>
      </div>
    );
  };

  // Calculate final values for display
  const finalYear = comparisonData[comparisonData.length - 1];
  const bitcoinFinal = finalYear?.bitcoinValue || 0;
  const equityFinal = finalYear?.homeEquity || 0;
  const bitcoinWins = bitcoinFinal > equityFinal;
  const difference = Math.abs(bitcoinFinal - equityFinal);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={comparisonData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="year"
            label={{ value: 'Year', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
            domain={[0, loanTermYears]}
            ticks={Array.from({ length: Math.min(loanTermYears + 1, 16) }, (_, i) => Math.floor((i / 15) * loanTermYears))}
          />
          <YAxis
            label={{
              value: 'Wealth Value',
              angle: -90,
              position: 'insideLeft',
              offset: -5,
            }}
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            dataKey="homeEquity"
            name="Home Equity (Principal Paid)"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 3, stroke: '#3b82f6', strokeWidth: 1.5 }}
            activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="bitcoinValue"
            name={`₿ Bitcoin Value (${(BITCOIN_ANNUAL_GROWTH * 100).toFixed(0)}% annual growth)`}
            stroke="#f97316"
            strokeWidth={2.5}
            dot={{ r: 3, stroke: '#f97316', strokeWidth: 1.5 }}
            activeDot={{ r: 6, stroke: '#ea580c', strokeWidth: 2 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Insight Box */}
      <div className={`mt-6 p-5 rounded-lg border-2 ${
        bitcoinWins
          ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500'
          : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
      }`}>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          💡 {bitcoinWins ? '₿ Bitcoin Comparison' : '🏠 Home Building Wealth'}
        </p>
        <p className={`font-bold text-lg ${bitcoinWins ? 'text-orange-600' : 'text-blue-600'}`}>
          After {loanTermYears} years:
        </p>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Home Equity</p>
            <p className="text-lg font-bold text-blue-600">{formatCurrency(equityFinal)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Bitcoin Value</p>
            <p className="text-lg font-bold text-orange-600">{formatCurrency(bitcoinFinal)}</p>
          </div>
        </div>
        <p className="text-sm mt-3 text-gray-700 dark:text-gray-300">
          <span className={`font-semibold ${bitcoinWins ? 'text-orange-600' : 'text-blue-600'}`}>
            {bitcoinWins ? '₿ Bitcoin ahead by' : '🏠 Home ahead by'}
          </span>
          {' '}: <span className="font-bold">{formatCurrency(difference)}</span>
        </p>
        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400 italic">
          *Chart assumes 30% annual Bitcoin growth. Actual results depend on market conditions. This is illustrative only.
        </p>
      </div>
    </div>
  );
};

export default BitcoinWealthComparisonChart;
