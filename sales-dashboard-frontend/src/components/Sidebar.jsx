import {
  LayoutDashboard,
  BarChart3,
  MessageCircle,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
  Sun,
  Moon,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar, currentPage, isDark, toggleTheme }) {
  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { label: "Messages", icon: <MessageCircle className="w-5 h-5" /> },
    { label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen transition-all duration-300 ease-in-out flex flex-col justify-between shadow-lg`}
    >
      {/* Logo + Toggle */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <h1 className={`text-xl font-bold text-gray-900 dark:text-white ${!isOpen && "hidden"}`}>
              Admin
            </h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {isOpen ? (
              <ChevronsLeft className="w-5 h-5" />
            ) : (
              <ChevronsRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Nav Items */}
      <ul className="flex-1 space-y-2 px-3">
        {navItems.map(({ label, icon }) => {
          const isActive = label === currentPage;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {icon}
              {isOpen && <span className="text-sm font-medium">{label}</span>}
            </li>
          );
        })}
      </ul>

      {/* Theme Toggle & Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
        {/* Theme Toggle */}
        <div 
          className="flex items-center gap-3 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          onClick={toggleTheme}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {isOpen && <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </div>
        
        {/* Logout */}
        <div className="flex items-center gap-3 cursor-pointer text-red-500 hover:text-red-600 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200">
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm">Sign out</span>}
        </div>
      </div>
    </aside>
  );
}