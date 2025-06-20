import { useEffect, useState } from "react";

export default function MenuCategoryCard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/menu_category_sales")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3">Sales by Menu Category</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between py-2 border-b border-gray-100">
            <span>{cat.category}</span>
            <span>₱ {cat.sales.toLocaleString()} ({cat.sales_percentage}%)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
