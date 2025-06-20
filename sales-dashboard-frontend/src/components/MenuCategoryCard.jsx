import { useEffect, useState } from "react";
import { ChefHat, TrendingUp, TrendingDown, Pizza, Coffee, Utensils, BarChart3, PieChart, Table, Grid3x3 } from "lucide-react";

export default function MenuCategoryCard() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // 'table', 'bar', 'donut', 'grid'
  const isDark = false; // You can connect this to your theme context

  useEffect(() => {
    fetch("http://localhost:3000/api/menu_category_sales")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Calculate max sales for chart visualization
  const maxSales = Math.max(...data.map((item) => item.sales));
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);

  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('pizza') || cat.includes('main')) return <Pizza className="w-3 h-3" />;
    if (cat.includes('drink') || cat.includes('beverage') || cat.includes('coffee')) return <Coffee className="w-3 h-3" />;
    if (cat.includes('appetizer') || cat.includes('starter')) return <Utensils className="w-3 h-3" />;
    return <ChefHat className="w-3 h-3" />;
  };

  const getCategoryColor = (index) => {
    const colors = [
      'from-orange-500 to-red-500',
      'from-green-500 to-teal-500',
      'from-blue-500 to-purple-600',
      'from-pink-500 to-rose-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-blue-500',
      'from-purple-500 to-pink-500',
      'from-teal-500 to-cyan-500'
    ];
    return colors[index % colors.length];
  };

  const getSolidColor = (index) => {
    const colors = [
      'bg-orange-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-teal-500'
    ];
    return colors[index % colors.length];
  };

  const viewOptions = [
    { key: "table", label: "Table", icon: <Table className="w-3 h-3" /> },
    { key: "bar", label: "Bar", icon: <BarChart3 className="w-3 h-3" /> },
    { key: "donut", label: "Donut", icon: <PieChart className="w-3 h-3" /> },
    { key: "grid", label: "Grid", icon: <Grid3x3 className="w-3 h-3" /> }
  ];

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Category</th>
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Sales</th>
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="py-2 px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 bg-gradient-to-r ${getCategoryColor(index)} rounded flex items-center justify-center`}>
                    {getCategoryIcon(row.category)}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-xs truncate">
                    {row.category.length > 12 ? row.category.substring(0, 12) + '...' : row.category}
                  </span>
                </div>
              </td>
              <td className="py-2 px-2">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-900 dark:text-white">₱{row.sales.toLocaleString()}</span>
                  {row.sales > totalSales / data.length ? (
                    <TrendingUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-500" />
                  )}
                </div>
              </td>
              <td className="py-2 px-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{row.sales_percentage}%</span>
                  <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getCategoryColor(index)} rounded-full transition-all duration-500`}
                      style={{ width: `${row.sales_percentage}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderBarChart = () => (
    <div className="space-y-3">
      <div className="flex justify-end mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">Max: ₱{maxSales.toLocaleString()}</div>
      </div>
      <div className="space-y-3">
        {data.map((row, index) => (
          <div key={row.id} className="group">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 bg-gradient-to-r ${getCategoryColor(index)} rounded-sm flex items-center justify-center`}>
                  {getCategoryIcon(row.category)}
                </div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {row.category.length > 15 ? row.category.substring(0, 15) + '...' : row.category}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-900 dark:text-white">₱{row.sales.toLocaleString()}</span>
            </div>
            <div className="relative">
              <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getCategoryColor(index)} rounded-lg transition-all duration-1000 ease-out group-hover:opacity-90 relative`}
                  style={{
                    width: `${(row.sales / maxSales) * 100}%`,
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                </div>
              </div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <span className="text-xs font-semibold text-white drop-shadow-md">{row.sales_percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDonutChart = () => {
    const centerX = 80;
    const centerY = 80;
    const radius = 60;
    const innerRadius = 35;
    
    let cumulativePercentage = 0;
    
    const createArcPath = (startAngle, endAngle, outerRadius, innerRadius) => {
      const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
      const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      const outerArc = [
        "M", start.x, start.y, 
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
      
      const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);
      const innerArc = [
        "L", innerEnd.x, innerEnd.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 0, innerStart.x, innerStart.y
      ].join(" ");
      
      return outerArc + innerArc + " Z";
    };
    
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <svg width="160" height="160" className="transform rotate-0">
            {data.map((item, index) => {
              const percentage = parseFloat(item.sales_percentage);
              const startAngle = cumulativePercentage * 3.6;
              const endAngle = (cumulativePercentage + percentage) * 3.6;
              cumulativePercentage += percentage;
              
              const colors = [
                '#f97316', '#10b981', '#3b82f6', '#ec4899', 
                '#eab308', '#6366f1', '#8b5cf6', '#14b8a6'
              ];
              
              return (
                <path
                  key={item.id}
                  d={createArcPath(startAngle, endAngle, radius, innerRadius)}
                  fill={colors[index % colors.length]}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">₱{(totalSales/1000).toFixed(0)}k</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full">
          {data.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className={`w-3 h-3 rounded-full ${getSolidColor(index)}`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {item.category.length > 8 ? item.category.substring(0, 8) + '...' : item.category}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.sales_percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 gap-3">
      {data.map((row, index) => (
        <div
          key={row.id}
          className={`relative p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(index)} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="absolute top-2 right-2 opacity-20">
            {getCategoryIcon(row.category)}
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                {getCategoryIcon(row.category)}
              </div>
              <h4 className="text-xs font-semibold truncate">
                {row.category.length > 10 ? row.category.substring(0, 10) + '...' : row.category}
              </h4>
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold">₱{row.sales.toLocaleString()}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-90">{row.sales_percentage}% share</span>
                {row.sales > totalSales / data.length ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderView = () => {
    switch (viewMode) {
      case "table": return renderTableView();
      case "bar": return renderBarChart();
      case "donut": return renderDonutChart();
      case "grid": return renderGridView();
      default: return renderTableView();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <ChefHat className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Menu Categories</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sales performance analysis</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
          {viewOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setViewMode(option.key)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === option.key
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {option.icon}
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[200px]">
        {renderView()}
      </div>

      {/* Summary Stats */}
      {viewMode !== "donut" && (
        <div className="mt-4 grid grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm font-bold text-gray-900 dark:text-white">₱{totalSales.toLocaleString()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Sales</p>
          </div>
          <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-sm font-bold text-orange-600 dark:text-orange-400">
              ₱{data.length > 0 ? ((totalSales / data.length) / 1000).toFixed(0) : 0}k
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Average</p>
          </div>
          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-bold text-green-600 dark:text-green-400">
              {data.length > 0 ? Math.max(...data.map(item => parseFloat(item.sales_percentage))).toFixed(1) : 0}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Top Share</p>
          </div>
        </div>
      )}
    </div>
  );
}