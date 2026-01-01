import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EquityBuildupChartProps {
  data: {
    year: number;
    homeValue: number;
    equity: number;
  }[];
  height?: number;
  homePrice: number;
  downPayment: number;
}

const EquityBuildupChart: React.FC<EquityBuildupChartProps> = ({ data, height = 400, homePrice, downPayment }) => {
  const formatYAxisTick = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(1)}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const homeValue = payload[0]?.value || 0;
      const equity = payload[1]?.value || 0;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <p className="text-gray-700 dark:text-gray-300">{`Year: ${label}`}</p>
          <p className="text-blue-600">{`Home Value: ${formatYAxisTick(homeValue)}`}</p>
          <p className="text-red-600">{`Equity: ${formatYAxisTick(equity)}`}</p>
        </div>
      );
    }
    return null;
  };

  // Fix data at year 0
  const fixedData = data.length > 0 ? [{ year: 0, homeValue: homePrice, equity: downPayment }, ...data] : data;

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ height }} className="w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />;
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={fixedData} margin={{ top: 20, right: 40, left: 40, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="year" 
          label={{ value: "Year", position: "insideBottomRight", offset: -5 }} 
          tick={{ fontSize: 12 }} 
        />
        <YAxis 
          tickFormatter={formatYAxisTick} 
          label={{ value: "Value", angle: -90, position: "insideLeft", offset: 10 }} 
          tick={{ fontSize: 12 }} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Area type="monotone" dataKey="homeValue" name="Home Value" fill="#8884d6" stroke="#8884d6" />
        <Line type="monotone" dataKey="equity" name="Equity" stroke="#ff7300" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default EquityBuildupChart;