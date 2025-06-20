import { useEffect, useState } from "react";
import { useTheme } from "../App";
import { Users, TrendingUp, Heart, BarChart3 } from "lucide-react";

export default function DiningPreferencesCard() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'chart'
  const { isDark } = useTheme();

  useEffect(() => {
    fetch("http://localhost:3000/api/dining_preferences")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Calculate max percentage for chart visualization
  const maxPercentage = Math.max(...data.map(item => parseFloat(item.percentage) || 0));

  const getPreferenceIcon = (preference) => {
    const pref = preference.toLowerCase();
    if (pref.includes('dine') || pref.includes('eat')) return <Users className="w-3 h-3" />;
    if (pref.includes('favorite') || pref.includes('love')) return <Heart className="w-3 h-3" />;
    return <TrendingUp className="w-3 h-3" />;
  };

  const getPreferenceColor = (index) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-500',
      'from-pink-500 to-rose-500',
      'from-yellow-500 to-orange-500',
      'from-indigo-500 to-blue-500',
      'from-purple-500 to-pink-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Dining Preferences
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Customer insights
            </p>
          </div>
        </div>

        {/* Compact View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md p-0.5">
          <button
            onClick={() => setViewMode('table')}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              viewMode === 'chart'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Chart
          </button>
        </div>
      </div>

      {viewMode === 'table' ? (
        /* Compact Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Preference
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Count
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Share
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr 
                  key={row.id} 
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 bg-gradient-to-r ${getPreferenceColor(index)} rounded flex items-center justify-center`}>
                        {getPreferenceIcon(row.preference)}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white text-xs truncate">
                        {row.preference.length > 15 ? row.preference.substring(0, 15) + '...' : row.preference}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <span className="font-semibold text-gray-900 dark:text-white text-xs">
                      {row.customer_count_range}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        {row.percentage}
                      </span>
                      <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${getPreferenceColor(index)} rounded-full transition-all duration-500`}
                          style={{ width: `${(parseFloat(row.percentage) / maxPercentage) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Compact Chart View */
        <div className="space-y-2">
          {data.map((row, index) => (
            <div 
              key={row.id} 
              className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-6 h-6 bg-gradient-to-r ${getPreferenceColor(index)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {getPreferenceIcon(row.preference)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-900 dark:text-white truncate">
                      {row.preference.length > 20 ? row.preference.substring(0, 20) + '...' : row.preference}
                    </span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {row.percentage}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getPreferenceColor(index)} rounded-full transition-all duration-700 ease-out`}
                      style={{ 
                        width: `${(parseFloat(row.percentage) / maxPercentage) * 100}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Compact Summary Stats */}
          <div className="mt-3 grid grid-cols-3 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {data.length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-green-500">
                {data.length > 0 ? Math.max(...data.map(item => parseFloat(item.percentage) || 0)).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Top</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-blue-500">
                {data.reduce((sum, item) => {
                  const range = item.customer_count_range;
                  const match = range.match(/(\d+)-(\d+)/);
                  return sum + (match ? Math.floor((parseInt(match[1]) + parseInt(match[2])) / 2) : 0);
                }, 0)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}