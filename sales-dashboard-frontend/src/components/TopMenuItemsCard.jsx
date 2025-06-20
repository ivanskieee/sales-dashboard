import { useEffect, useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Pizza, Coffee, Utensils, ChefHat, BarChart3, PieChart, Table, Grid3x3, Medal, Crown, Award } from "lucide-react";

export default function TopMenuItemsCard() {
  const [items, setItems] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // 'table', 'bar', 'donut', 'grid'
  const isDark = false; // You can connect this to your theme context

  useEffect(() => {
    fetch("http://localhost:3000/api/top_menu_items")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  // Calculate max orders for chart visualization
  const maxOrders = Math.max(...items.map((item) => item.orders));
  const totalOrders = items.reduce((sum, item) => sum + item.orders, 0);

  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('pizza') || cat.includes('main')) return <Pizza className="w-3 h-3" />;
    if (cat.includes('drink') || cat.includes('beverage') || cat.includes('coffee')) return <Coffee className="w-3 h-3" />;
    if (cat.includes('appetizer') || cat.includes('starter')) return <Utensils className="w-3 h-3" />;
    return <ChefHat className="w-3 h-3" />;
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="w-4 h-4 text-yellow-500" />;
    if (index === 1) return <Medal className="w-4 h-4 text-gray-400" />;
    if (index === 2) return <Award className="w-4 h-4 text-orange-600" />;
    return <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-gray-500">#{index + 1}</span>;
  };

  const getItemColor = (index) => {
    const colors = [
      'from-yellow-500 to-orange-500', // Gold
      'from-gray-400 to-gray-600',     // Silver
      'from-orange-600 to-red-600',    // Bronze
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-500',
      'from-pink-500 to-rose-500',
      'from-indigo-500 to-blue-500',
      'from-purple-500 to-pink-500'
    ];
    return colors[index % colors.length];
  };

  const getSolidColor = (index) => {
    const colors = [
      'bg-yellow-500',   // Gold
      'bg-gray-400',     // Silver  
      'bg-orange-600',   // Bronze
      'bg-blue-500',
      'bg-green-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-purple-500'
    ];
    return colors[index % colors.length];
  };

  const getRankBadgeColor = (index) => {
    if (index === 0) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (index === 1) return 'bg-gradient-to-r from-gray-300 to-gray-500';  
    if (index === 2) return 'bg-gradient-to-r from-orange-400 to-orange-600';
    return 'bg-gradient-to-r from-gray-200 to-gray-400';
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
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Rank</th>
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Item</th>
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Orders</th>
            <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">Share</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const orderPercentage = ((item.orders / totalOrders) * 100).toFixed(1);
            return (
              <tr key={item.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${getRankBadgeColor(index)} rounded-full flex items-center justify-center`}>
                      {index < 3 ? getRankIcon(index) : <span className="text-xs font-bold text-white">#{index + 1}</span>}
                    </div>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 bg-gradient-to-r ${getItemColor(index)} rounded flex items-center justify-center`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white text-xs truncate">
                        {item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900 dark:text-white">{item.orders}</span>
                    {item.orders > totalOrders / items.length ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{orderPercentage}%</span>
                    <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${getItemColor(index)} rounded-full transition-all duration-500`}
                        style={{ width: `${orderPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderBarChart = () => (
    <div className="space-y-3">
      <div className="flex justify-end mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">Max: {maxOrders} orders</div>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => {
          const orderPercentage = ((item.orders / totalOrders) * 100).toFixed(1);
          return (
            <div key={item.id} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 ${getRankBadgeColor(index)} rounded-full flex items-center justify-center`}>
                    {index < 3 ? getRankIcon(index) : <span className="text-xs font-bold text-white">#{index + 1}</span>}
                  </div>
                  <div className={`w-4 h-4 bg-gradient-to-r ${getItemColor(index)} rounded-sm flex items-center justify-center`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name}
                    </span>
                    <span className="text-xs text-gray-400">{item.category}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{item.orders} orders</span>
              </div>
              <div className="relative">
                <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getItemColor(index)} rounded-lg transition-all duration-1000 ease-out group-hover:opacity-90 relative`}
                    style={{
                      width: `${(item.orders / maxOrders) * 100}%`,
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                  </div>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs font-semibold text-white drop-shadow-md">{orderPercentage}%</span>
                </div>
              </div>
            </div>
          );
        })}
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
            {items.map((item, index) => {
              const percentage = (item.orders / totalOrders) * 100;
              const startAngle = cumulativePercentage * 3.6;
              const endAngle = (cumulativePercentage + percentage) * 3.6;
              cumulativePercentage += percentage;
              
              const colors = [
                '#eab308', '#9ca3af', '#ea580c', '#3b82f6', 
                '#10b981', '#ec4899', '#6366f1', '#8b5cf6'
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
              <div className="text-lg font-bold text-gray-900 dark:text-white">{totalOrders}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full">
          {items.slice(0, 6).map((item, index) => (
            <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className={`w-3 h-3 rounded-full ${getSolidColor(index)}`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                  {item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.orders}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGridView = () => (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, index) => {
        const orderPercentage = ((item.orders / totalOrders) * 100).toFixed(1);
        return (
          <div
            key={item.id}
            className={`relative p-3 rounded-xl bg-gradient-to-br ${getItemColor(index)} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="absolute top-2 right-2 opacity-20">
              {getCategoryIcon(item.category)}
            </div>
            <div className="absolute top-2 left-2">
              <div className={`w-6 h-6 ${getRankBadgeColor(index)} rounded-full flex items-center justify-center`}>
                {index < 3 ? getRankIcon(index) : <span className="text-xs font-bold text-white">#{index + 1}</span>}
              </div>
            </div>
            <div className="relative z-10 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                  {getCategoryIcon(item.category)}
                </div>
                <h4 className="text-xs font-semibold truncate">
                  {item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name}
                </h4>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold">{item.orders} orders</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-90">{orderPercentage}% share</span>
                  {item.orders > totalOrders / items.length ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
                <div className="text-xs text-white/80">{item.category}</div>
              </div>
            </div>
          </div>
        );
      })}
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
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Top Menu Items</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Best performing dishes</p>
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
            <p className="text-sm font-bold text-gray-900 dark:text-white">{totalOrders}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
          </div>
          <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
              {items.length > 0 ? Math.round(totalOrders / items.length) : 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Average</p>
          </div>
          <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm font-bold text-green-600 dark:text-green-400">
              {items.length > 0 ? Math.max(...items.map(item => item.orders)) : 0}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Top Item</p>
          </div>
        </div>
      )}
    </div>
  );
}