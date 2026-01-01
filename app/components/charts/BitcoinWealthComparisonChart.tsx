"use client";

import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface BitcoinWealthComparisonChartProps {
  downPayment: number;
  yearlyData: {
    year: number;
    principalPaid?: number;
  }[];
  bitcoinPrice: number | null;
  loanTermYears: number;
}

const BitcoinWealthComparisonChart: React.FC<
  BitcoinWealthComparisonChartProps
> = ({ downPayment, yearlyData, bitcoinPrice, loanTermYears }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [bitcoinCAGR, setBitcoinCAGR] = useState(30);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const comparisonData = useMemo(() => {
    if (downPayment <= 0 || !bitcoinPrice) return [];

    const data = [];
    data.push({
      year: 0,
      homeEquity: 0,
      bitcoinValue: downPayment,
      bitcoinLabel: `$${downPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
      homeEquityLabel: "$0",
    });

    for (let year = 1; year <= loanTermYears; year++) {
      const homeEquityEntry = yearlyData.find((d) => d.year === year);
      const homeEquity = homeEquityEntry
        ? homeEquityEntry.principalPaid || 0
        : 0;
      const cagrDecimal = bitcoinCAGR / 100;
      const bitcoinValue = downPayment * Math.pow(1 + cagrDecimal, year);

      data.push({
        year,
        homeEquity: Math.max(homeEquity, 0),
        bitcoinValue: Math.max(bitcoinValue, 0),
        bitcoinLabel: `$${bitcoinValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
        homeEquityLabel: `$${homeEquity.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
      });
    }

    return data;
  }, [downPayment, yearlyData, bitcoinPrice, loanTermYears, bitcoinCAGR]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(value);
  };

  const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
    active,
    payload,
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    const data = payload[0].payload;
    const isBitcoin = payload[0].dataKey === "bitcoinValue";

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg border-2 border-orange-300 dark:border-orange-500">
        <p className="text-gray-700 dark:text-gray-300 font-bold mb-2">{`Year ${data.year}`}</p>
        <p
          className={`font-semibold text-sm ${isBitcoin ? "text-orange-600" : "text-blue-600"}`}
        >
          {isBitcoin ? "₿ Bitcoin Value" : "🏠 Mortgage Equity"}
        </p>
        <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
          {isBitcoin ? data.bitcoinLabel : data.homeEquityLabel}
        </p>
      </div>
    );
  };

  if (!isMounted) {
    return (
      <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
    );
  }

  if (comparisonData.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
          Add a down payment to see wealth comparison
        </p>
      </div>
    );
  }

  const finalYear = comparisonData[comparisonData.length - 1];
  const bitcoinFinal = finalYear?.bitcoinValue || 0;
  const equityFinal = finalYear?.homeEquity || 0;
  const bitcoinWins = bitcoinFinal > equityFinal;
  const difference = Math.abs(bitcoinFinal - equityFinal);

  return (
    <div className="w-full space-y-6">
      {/* Explanation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Scenario:</strong> What if you invested your $
          {downPayment.toLocaleString()} down payment in Bitcoin instead? This
          chart compares:
        </p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 mt-2 ml-4 space-y-1">
          <li>
            🏠 <strong>Mortgage Equity:</strong> Principal you pay down
            (mortgage wealth)
          </li>
          <li>
            ₿ <strong>Bitcoin Value:</strong> Down payment invested in Bitcoin
            at selected growth rate
          </li>
        </ul>
      </div>

      {/* Bitcoin CAGR Slider Control */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-300 dark:border-orange-500/50 p-5 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
            ₿ Bitcoin Annual Growth Rate (CAGR)
          </label>
          <div className="text-right">
            <span className="text-2xl font-black text-orange-600 dark:text-orange-400">
              {bitcoinCAGR}%
            </span>
            <p className="text-xs text-gray-600 dark:text-gray-400">per year</p>
          </div>
        </div>

        <input
          type="range"
          min="1"
          max="100"
          value={bitcoinCAGR}
          onChange={(e) => setBitcoinCAGR(Number(e.target.value))}
          className="w-full h-3 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />

        <div className="flex gap-2 mt-4 flex-wrap">
          {[1, 10, 20, 30, 50, 75, 100].map((rate) => (
            <button
              key={rate}
              onClick={() => setBitcoinCAGR(rate)}
              className={`text-xs px-3 py-1 rounded font-semibold transition-all ${
                bitcoinCAGR === rate
                  ? "bg-orange-600 text-white scale-105"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-orange-500"
              }`}
            >
              {rate}%
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
          1% = conservative, 30% = historical average, 100% = bullish projection
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={comparisonData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="year"
            label={{ value: "Year", position: "insideBottom", offset: -10 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Line
            type="monotone"
            dataKey="homeEquity"
            name="🏠 Mortgage Equity (Principal)"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
          <Line
            type="monotone"
            dataKey="bitcoinValue"
            name={`₿ Bitcoin Value (${bitcoinCAGR}% CAGR)`}
            stroke="#f97316"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Insight Box */}
      <div
        className={`p-6 rounded-lg border-2 ${bitcoinWins ? "bg-orange-50 dark:bg-orange-900/20 border-orange-500" : "bg-blue-50 dark:bg-blue-900/20 border-blue-500"}`}
      >
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          💡 After {loanTermYears} years:
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-blue-300 dark:border-blue-500/50">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              🏠 Mortgage Equity
            </p>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(equityFinal)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded border border-orange-300 dark:border-orange-500/50">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              ₿ Bitcoin Value
            </p>
            <p className="text-xl font-bold text-orange-600">
              {formatCurrency(bitcoinFinal)}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
          <p
            className={`font-bold ${bitcoinWins ? "text-orange-600" : "text-blue-600"}`}
          >
            {bitcoinWins ? "₿ Bitcoin" : "🏠 Home"} ahead by:{" "}
            <span className="text-2xl font-black">
              {formatCurrency(difference)}
            </span>
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-800 p-3 rounded border border-gray-300 dark:border-gray-700">
        ⚠️ Educational only. Bitcoin is volatile. Shows principal paydown only
        (no home appreciation). Not financial advice.
      </p>
    </div>
  );
};

export default BitcoinWealthComparisonChart;
