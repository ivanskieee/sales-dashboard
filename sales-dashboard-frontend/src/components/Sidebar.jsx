import {
  LayoutDashboard,
  BarChart3,
  MessageCircle,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar, currentPage }) {
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
      } bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out flex flex-col justify-between`}
    >
      {/* Logo + Toggle */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>Develop</h1>
          <button onClick={toggleSidebar}>
            {isOpen ? (
              <ChevronsLeft className="w-5 h-5" />
            ) : (
              <ChevronsRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Nav Items */}
      <ul className="flex-1 space-y-1 px-2">
        {navItems.map(({ label, icon }) => {
          const isActive = label === currentPage;
          return (
            <li
              key={label}
              className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {icon}
              {isOpen && <span className="text-sm">{label}</span>}
            </li>
          );
        })}
      </ul>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600">
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm">Sign out</span>}
        </div>
      </div>
    </aside>
  );
}
