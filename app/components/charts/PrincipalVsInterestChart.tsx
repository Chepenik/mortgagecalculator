"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Plus } from "lucide-react";
interface PrincipalVsInterestChartDataProps {
  data: {
    year: number;
    principalPaid: number;
    interestPaid: number;
  }[];
  height?: number;
  loanTermYears: number;
  extraPayment: number;
  onExtraPaymentChange: (amount: number) => void;
}
const PrincipalVsInterestChart: React.FC<PrincipalVsInterestChartDataProps> = ({
  data,
  height = 400,
  loanTermYears,
  extraPayment,
  onExtraPaymentChange,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [newExtraPayment, setNewExtraPayment] = useState("");

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatYAxisTick = (value: number) => {
    if (isNaN(value)) return "$0";
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(1)}`;
  };
  const sanitizeData = (
    data: { year: number; principalPaid: number; interestPaid: number }[],
  ): {
    year: number;
    principalPaid: number;
    interestPaid: number;
    extraPayments: number;
  }[] =>
    data.map((entry) => ({
      ...entry,
      principalPaid: Math.max(entry.principalPaid, 0),
      interestPaid: Math.max(entry.interestPaid, 0),
      extraPayments: extraPayment * 12 * entry.year,
    }));
  const sanitizedData = sanitizeData(data);
  const fullData = sanitizedData.filter(
    (entry) => entry.principalPaid + entry.interestPaid > 0,
  );
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-700 dark:text-gray-300">{`Year: ${label}`}</p>
          <p className="text-green-600">{`Interest: ${formatYAxisTick(payload[2].value)}`}</p>
          <p className="text-blue-600">{`Principal: ${formatYAxisTick(payload[1].value)}`}</p>
          <p className="text-purple-600">{`Extra Payments: ${formatYAxisTick(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };
  const handleExtraPaymentSubmit = () => {
    onExtraPaymentChange(Number(newExtraPayment));
    setNewExtraPayment("");
  };

  if (!isMounted) {
    return (
      <div
        style={{ height }}
        className="w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"
      />
    );
  }

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Plus className="h-5 w-5 text-orange-500 dark:text-orange-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="number"
              value={newExtraPayment}
              onChange={(e) => setNewExtraPayment(e.target.value)}
              placeholder="Extra Monthly Payment"
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              step={10}
            />
          </div>
          <button
            onClick={handleExtraPaymentSubmit}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={fullData}
          margin={{ top: 20, right: 40, left: 40, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "Year", position: "insideBottom", offset: -5 }}
            domain={[0, "dataMax"]}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: "Amount",
              angle: -90,
              position: "insideLeft",
              offset: 0,
            }}
            tickFormatter={formatYAxisTick}
            tick={{ fontSize: 12 }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="extraPayments"
            name="Extra Payments"
            stackId="1"
            stroke="#9c27b0"
            fillOpacity={0.6}
            fill="#9c27b0"
          />
          <Area
            type="monotone"
            dataKey="principalPaid"
            name="Principal"
            stackId="1"
            stroke="#8884d8"
            fillOpacity={0.6}
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="interestPaid"
            name="Interest"
            stackId="1"
            stroke="#82ca9d"
            fillOpacity={0.6}
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default PrincipalVsInterestChart;
