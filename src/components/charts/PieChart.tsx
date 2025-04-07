
import React from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PieChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  index,
  categories,
  colors = ["#3B82F6", "#14B8A6", "#8B5CF6", "#F97316", "#EF4444"],
  showLegend = true,
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
      <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
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
            verticalAlign="bottom"
            height={40}
            iconType="circle"
            iconSize={8}
          />
        )}
        
        <Pie
          data={data}
          dataKey={categories[0]}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]} 
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
};

export default PieChart;
