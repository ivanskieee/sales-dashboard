import { useEffect, useState } from "react";
import { useTheme } from "../App";
import { Users, TrendingUp, Heart, BarChart3 } from "lucide-react";

export default function DiningPreferencesCard() {
  const [data, setData] = useState([]);
  const { isDark } = useTheme();

  useEffect(() => {
    fetch("http://localhost:3000/api/dining_preferences")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const getPreferenceIcon = (preference) => {
    const pref = preference.toLowerCase();
    if (pref.includes('dine') || pref.includes('eat')) return <Users className="w-3 h-3" />;
    if (pref.includes('favorite') || pref.includes('love')) return <Heart className="w-3 h-3" />;
    return <TrendingUp className="w-3 h-3" />;
  };

  const getPreferenceColor = (index) => {
    const colors = [
      '#3B82F6', // Blue
      '#10B981', // Green
      '#F59E0B', // Amber
      '#EF4444', // Red
      '#8B5CF6', // Purple
      '#F97316', // Orange
      '#06B6D4', // Cyan
      '#84CC16', // Lime
    ];
    return colors[index % colors.length];
  };

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + parseFloat(item.percentage || 0), 0);
  
  // Create circle chart data
  let cumulativePercentage = 0;
  const chartData = data.map((item, index) => {
    const percentage = parseFloat(item.percentage || 0);
    const startAngle = (cumulativePercentage / 100) * 360;
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
    cumulativePercentage += percentage;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      color: getPreferenceColor(index)
    };
  });

  const createPath = (centerX, centerY, radius, startAngle, endAngle, innerRadius = 0) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const centerX = 100;
  const centerY = 100;
  const outerRadius = 80;
  const innerRadius = 50;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Dining Preferences
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Customer insights overview
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Circle Chart */}
        <div className="relative flex-shrink-0">
          <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
            {chartData.map((item, index) => (
              <g key={item.id || index}>
                <path
                  d={createPath(centerX, centerY, outerRadius, item.startAngle, item.endAngle, innerRadius)}
                  fill={item.color}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {data.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Categories
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {chartData.map((item, index) => (
            <div key={item.id || index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {getPreferenceIcon(item.preference)}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                    {item.preference}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {item.percentage.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.customer_count_range}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {data.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Categories</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-green-500">
            {data.length > 0 ? Math.max(...data.map(item => parseFloat(item.percentage) || 0)).toFixed(1) : 0}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Highest Share</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-blue-500">
            {data.length > 0 ? (total / data.length).toFixed(1) : 0}%
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
        </div>
      </div>
    </div>
  );
}