import { useEffect, useState } from "react";

export default function TopMenuItemsCard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/top_menu_items")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Top Menu Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="flex justify-between py-2 border-b border-gray-100">
            <span>{item.name} ({item.category})</span>
            <span>{item.orders} orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
