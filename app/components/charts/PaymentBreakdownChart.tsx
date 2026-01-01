"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface PaymentBreakdownChartDataProps {
  data: {
    name: string;
    value: number;
  }[];
  height?: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PaymentBreakdownChart: React.FC<PaymentBreakdownChartDataProps> = ({
  data,
  height = 400,
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const payloadData = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-700 dark:text-gray-300">{`${payloadData.name}: ${formatIntlNumber(payloadData.value)}`}</p>
        </div>
      );
    }
    return null;
  };

  const formatIntlNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!isMounted) {
    return (
      <div
        style={{ height }}
        className="w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center"
      >
        <p className="text-gray-400">Loading Chart...</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: height, minHeight: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentBreakdownChart;
