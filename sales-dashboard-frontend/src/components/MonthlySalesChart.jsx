import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

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
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-3 shadow-2xl">
          <p className="text-gray-200 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-300 text-sm">
                {entry.name}: <span className="font-semibold text-white">
                  {entry.name === 'Revenue' ? `$${entry.value?.toLocaleString()}` : entry.value?.toLocaleString()}
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
        r={isHovered ? 6 : 4}
        fill={dataKey === 'revenue' ? '#06d6a0' : '#118ab2'}
        stroke={dataKey === 'revenue' ? '#04c086' : '#0f7a94'}
        strokeWidth={2}
        className="transition-all duration-200 drop-shadow-lg"
        style={{
          filter: isHovered ? 'drop-shadow(0 0 8px rgba(6, 214, 160, 0.6))' : 'none'
        }}
      />
    );
  };

  return (
    <div className="relative">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800/90 to-gray-900 rounded-2xl" />
      
      {/* Main container */}
      <div className="relative bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700/50">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Monthly Performance
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-sm" />
                <span className="text-sm font-medium text-gray-300">Units Sold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm" />
                <span className="text-sm font-medium text-gray-300">Revenue</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Track your sales performance and revenue trends</p>
        </div>

        {/* Chart container */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart 
              data={data}
              onMouseMove={(e) => setHoveredIndex(e?.activeTooltipIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="unitsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#118ab2" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#118ab2" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06d6a0" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#06d6a0" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#374151" 
                strokeOpacity={0.6}
                vertical={false}
              />
              
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF', fontWeight: 500 }}
                dy={10}
              />
              
              <YAxis 
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                width={60}
              />
              
              <YAxis 
                yAxisId="right" 
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                width={60}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
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
                stroke="url(#unitsLine)"
                strokeWidth={3}
                name="Units Sold"
                dot={<CustomDot dataKey="units_sold" />}
                activeDot={{ r: 6, stroke: '#0f7a94', strokeWidth: 2, fill: '#118ab2' }}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(17, 138, 178, 0.3))'
                }}
              />
              
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="revenue" 
                stroke="url(#revenueLine)"
                strokeWidth={3}
                name="Revenue"
                dot={<CustomDot dataKey="revenue" />}
                activeDot={{ r: 6, stroke: '#04c086', strokeWidth: 2, fill: '#06d6a0' }}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(6, 214, 160, 0.3))'
                }}
              />
              
              {/* Gradient definitions for lines */}
              <defs>
                <linearGradient id="unitsLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#118ab2" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
                <linearGradient id="revenueLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06d6a0" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom stats summary */}
        <div className="mt-6 pt-4 border-t border-gray-700/60">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Total Units</div>
              <div className="text-lg font-bold text-gray-200">
                {data.reduce((sum, item) => sum + (item.units_sold || 0), 0).toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Total Revenue</div>
              <div className="text-lg font-bold text-gray-200">
                ${data.reduce((sum, item) => sum + (item.revenue || 0), 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}