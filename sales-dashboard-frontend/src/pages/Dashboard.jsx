import { useState } from "react";
import { useTheme } from "../App";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DaySalesCard from "../components/DaySalesCard";
import DiningPreferencesCard from "../components/DiningPreferencesCard";
import MenuCategoryCard from "../components/MenuCategoryCard";
import MonthlySalesChart from "../components/MonthlySalesChart";
import TopMenuItemsCard from "../components/TopMenuItemsCard";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        currentPage="Dashboard"
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Right side layout (Navbar + Main Content) */}
      <div className="flex flex-col flex-1">
        {/* 👇 Now you can see the Navbar */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />

        <main className="flex-1 p-6 transition-all duration-300 ease-in-out bg-gray-50 dark:bg-gray-900">
  <div className="grid grid-cols-1 gap-6">
    {/* Top row - Full width cards */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <DaySalesCard />
      <DiningPreferencesCard />
    </div>
    
    {/* Bottom row - 3 cards side by side in landscape */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <MenuCategoryCard />
      <MonthlySalesChart />
      <TopMenuItemsCard />
    </div>
  </div>
</main>
      </div>
    </div>
  );
}
