import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function MonterlySalesChart() {
  const [data, setData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/monthly_sales")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 dark:text-white font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {entry.name}: <span className="font-semibold text-gray-900 dark:text-white">
                  {entry.name === 'Revenue' ? `₱${entry.value?.toLocaleString()}` : entry.value?.toLocaleString()}
                </span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, index, dataKey } = props;
    const isHovered = hoveredIndex === index;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isHovered ? 5 : 3}
        fill={dataKey === 'revenue' ? '#10b981' : '#3b82f6'}
        stroke={dataKey === 'revenue' ? '#059669' : '#2563eb'}
        strokeWidth={2}
        className="transition-all duration-200"
      />
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Monthly Performance
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sales trends & revenue
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Units</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Revenue</span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart 
            data={data}
            onMouseMove={(e) => setHoveredIndex(e?.activeTooltipIndex)}
            onMouseLeave={() => setHoveredIndex(null)}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="unitsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-600"
              strokeOpacity={0.5}
              vertical={false}
            />
            
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }}
              className="dark:fill-gray-400"
              dy={8}
            />
            
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6b7280' }}
              className="dark:fill-gray-400"
              width={50}
            />
            
            <YAxis 
              yAxisId="right" 
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#6b7280' }}
              className="dark:fill-gray-400"
              width={50}
              tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}K`}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Area fills for visual depth */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="units_sold"
              stroke="none"
              fill="url(#unitsGradient)"
            />
            
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="none"
              fill="url(#revenueGradient)"
            />
            
            {/* Main lines */}
            <Line 
              yAxisId="left" 
              type="monotone" 
              dataKey="units_sold" 
              stroke="#3b82f6"
              strokeWidth={2.5}
              name="Units Sold"
              dot={<CustomDot dataKey="units_sold" />}
              activeDot={{ r: 5, stroke: '#2563eb', strokeWidth: 2, fill: '#3b82f6' }}
            />
            
            <Line 
              yAxisId="right" 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981"
              strokeWidth={2.5}
              name="Revenue"
              dot={<CustomDot dataKey="revenue" />}
              activeDot={{ r: 5, stroke: '#059669', strokeWidth: 2, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            {data.reduce((sum, item) => sum + (item.units_sold || 0), 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Units</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            ₱{data.reduce((sum, item) => sum + (item.revenue || 0), 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-emerald-500">
            ₱{data.length > 0 ? Math.round(data.reduce((sum, item) => sum + (item.revenue || 0), 0) / data.length).toLocaleString() : '0'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Avg/Month</p>
        </div>
      </div>
    </div>
  );
}