import { useEffect, useState } from "react";

export default function DaySalesCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/day_sales")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Day Sales (₱)</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="py-2">Day</th>
            <th>Sales</th>
            <th>Status</th>
            <th>% of Weekly Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t border-gray-200">
              <td className="py-2">{row.day}</td>
              <td>₱ {row.sales.toLocaleString()}</td>
              <td>{row.status}</td>
              <td>{row.percent_weekly_sales.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
