
import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  yAxisWidth?: number;
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  index,
  categories,
  colors = ["#3B82F6"],
  yAxisWidth = 40,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  className,
}) => {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = {
      color: colors[i % colors.length],
    };
    return acc;
  }, {} as Record<string, { color: string }>);

  return (
    <ChartContainer className={className} config={config}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        
        {showXAxis && (
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            dy={10}
          />
        )}
        
        {showYAxis && (
          <YAxis
            width={yAxisWidth}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            dx={-10}
          />
        )}
        
        {showTooltip && (
          <Tooltip
            content={({ active, payload }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                labelKey={index}
              />
            )}
          />
        )}
        
        {showLegend && (
          <Legend
            verticalAlign="top"
            height={40}
            iconType="circle"
            iconSize={8}
          />
        )}
        
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
            barSize={32}
          />
        ))}
      </RechartsBarChart>
    </ChartContainer>
  );
};

export default BarChart;
