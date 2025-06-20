import { useEffect, useState } from "react";

export default function DiningPreferencesCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/dining_preferences")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Customer Dining Preferences</h3>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="py-2 text-left">Preference</th>
            <th>Customers</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p.id} className="border-t border-gray-200">
              <td className="py-2">{p.preference}</td>
              <td>{p.customer_count_range}</td>
              <td>{p.percentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
