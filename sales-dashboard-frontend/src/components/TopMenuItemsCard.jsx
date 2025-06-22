import { useEffect, useState } from "react";
import { Trophy, TrendingUp, TrendingDown, Pizza, Coffee, Utensils, ChefHat, X, Star, DollarSign, Clock } from "lucide-react";

export default function TopMenuItemsCard() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDark = false; 

  useEffect(() => {
    fetch("http://localhost:3000/api/top_menu_items")
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const maxOrders = Math.max(...items.map((item) => item.orders));
  const totalOrders = items.reduce((sum, item) => sum + item.orders, 0);

  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('pizza') || cat.includes('main')) return <Pizza className="w-3 h-3" />;
    if (cat.includes('drink') || cat.includes('beverage') || cat.includes('coffee')) return <Coffee className="w-3 h-3" />;
    if (cat.includes('appetizer') || cat.includes('starter')) return <Utensils className="w-3 h-3" />;
    return <ChefHat className="w-3 h-3" />;
  };

  const getItemColor = (index) => {
    const colors = [
      'from-yellow-500 to-orange-500',
      'from-gray-400 to-gray-600',
      'from-orange-600 to-red-600',
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-500',
      'from-pink-500 to-rose-500'
    ];
    return colors[index % colors.length];
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
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
          <div className="text-xs text-gray-500 dark:text-gray-400">Max: {maxOrders}</div>
        </div>
        <br></br>
        <br></br>
        <br></br>

        {/* Vertical Bar Chart */}
        <div className="mb-4">
          <div className="flex items-end justify-center gap-3 h-32 px-2">
            {items.slice(0, 8).map((item, index) => {
              const barHeight = (item.orders / maxOrders) * 100;
              
              return (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative flex flex-col items-center justify-end h-24 mb-2">
                    {/* Bar */}
                    <div
                      className={`w-4 bg-gradient-to-t ${getItemColor(index)} rounded-t-sm transition-all duration-1000 ease-out hover:opacity-80 hover:scale-105 relative`}
                      style={{
                        height: `${barHeight}%`,
                        minHeight: '8px',
                        animationDelay: `${index * 150}ms`,
                      }}
                    >
                      {/* Value label on hover */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-gray-900 text-white text-xs px-1 py-0.5 rounded shadow-lg whitespace-nowrap">
                          {item.orders}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Category Icon */}
                  <div className={`w-5 h-5 bg-gradient-to-r ${getItemColor(index)} rounded-full flex items-center justify-center mb-1`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  
                  {/* Item Name */}
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-900 dark:text-white truncate max-w-12">
                      {item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* X-axis line */}
          <div className="w-full h-px bg-gray-200 dark:bg-gray-600 mt-2"></div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm font-bold text-gray-900 dark:text-white">{totalOrders}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
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
      </div>

      {/* Modal for Item Details */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu Item Details</h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Item Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  {getCategoryIcon(selectedItem.category)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedItem.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedItem.category}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Orders</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{selectedItem.orders}</p>
                </div>

                {selectedItem.price && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Price</span>
                    </div>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">${selectedItem.price}</p>
                  </div>
                )}

                {selectedItem.rating && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Rating</span>
                    </div>
                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{selectedItem.rating}/5</p>
                  </div>
                )}

                {selectedItem.prep_time && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Prep Time</span>
                    </div>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{selectedItem.prep_time} min</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {selectedItem.description && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Description</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              )}

              {/* Ingredients */}
              {selectedItem.ingredients && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Ingredients</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.ingredients.split(',').map((ingredient, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-700 dark:text-gray-300"
                      >
                        {ingredient.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Metrics */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Market Share</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {((selectedItem.orders / totalOrders) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Rank</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      #{items.findIndex(item => item.id === selectedItem.id) + 1} of {items.length}
                    </span>
                  </div>
                  {selectedItem.revenue && (
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${selectedItem.revenue}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}