import { useEffect, useState } from "react";
import { useTheme } from "../App";
import { TrendingUp, TrendingDown, Circle, BarChart3 } from "lucide-react";

export default function DaySalesCard() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'chart'
  const { isDark } = useTheme();

  useEffect(() => {
    fetch("http://localhost:3000/api/day_sales")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Calculate max sales for chart visualization
  const maxSales = Math.max(...data.map((item) => item.sales));

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      case "closed":
        return "text-red-500 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    return status.toLowerCase() === "open" ? (
      <Circle className="w-2 h-2 fill-current" />
    ) : (
      <Circle className="w-2 h-2 fill-current" />
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Day Sales
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Weekly overview
            </p>
          </div>
        </div>

        {/* Compact View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-md p-0.5">
          <button
            onClick={() => setViewMode("table")}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              viewMode === "table"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("chart")}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              viewMode === "chart"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Chart
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        /* Compact Table View */
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Day
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Sales
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-2 px-2 font-medium text-gray-700 dark:text-gray-300">
                  % Weekly
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
                    <span className="font-medium text-gray-900 dark:text-white">
                      {row.day.substring(0, 3)}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        ₱{row.sales.toLocaleString()}
                      </span>
                      {row.sales > 8000 ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <span
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        row.status
                      )}`}
                    >
                      {getStatusIcon(row.status)}
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">
                        {row.percent_weekly_sales.toFixed(0)}%
                      </span>
                      <div className="w-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${row.percent_weekly_sales}%` }}
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
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {row.day.substring(0, 2)}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      row.status.toLowerCase() === "open"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      ₱{row.sales.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {row.percent_weekly_sales.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${(row.sales / maxSales) * 100}%`,
                        animationDelay: `${index * 100}ms`,
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
                ₱44,500
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                100%
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg %</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-green-500">
                {
                  data.filter((item) => item.status.toLowerCase() === "open")
                    .length
                }
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Open</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
