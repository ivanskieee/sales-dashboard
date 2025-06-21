import {
  LayoutDashboard,
  BarChart3,
  MessageCircle,
  Settings,
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
      } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen transition-all duration-500 ease-out flex flex-col justify-between shadow-lg`}
    >
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 transition-all duration-300 group-hover:shadow-purple-500/40 group-hover:scale-105">
                <span className="text-white font-bold text-lg tracking-tight">D</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-20 blur-sm -z-10 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            
            <div className={`overflow-hidden transition-all duration-500 ease-out ${
              isOpen ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
            }`}>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent whitespace-nowrap">
                Admin
              </h1>
            </div>
          </div>
          
          {/* Toggle Button */}
        </div>
      </div>

      {/* Nav Items */}
      <ul className="flex-1 space-y-2 px-4 py-6">
        {navItems.map(({ label, icon }) => {
          const isActive = label === currentPage;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ease-out group ${
                isActive
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 transform scale-[1.02]"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-[1.01]"
              }`}
            >
              <div className="flex-shrink-0">
                {icon}
              </div>
              <div className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
              }`}>
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div 
          className="flex items-center gap-3 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-out hover:scale-[1.01] group"
          onClick={toggleTheme}
        >
          <div className="flex-shrink-0">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </div>
          <div className={`overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? 'max-w-xs opacity-100' : 'max-w-0 opacity-0'
          }`}>
            <span className="text-sm font-medium whitespace-nowrap">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}