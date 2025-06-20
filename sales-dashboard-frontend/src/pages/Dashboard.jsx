import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DaySalesCard from "../components/DaySalesCard";
import DiningPreferencesCard from "../components/DiningPreferencesCard";
import MenuCategoryCard from "../components/MenuCategoryCard";
import MonthlySalesChart from "../components/MonthlySalesChart";
import TopMenuItemsCard from "../components/TopMenuItemsCard";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        currentPage="Dashboard"
      />

      <main className="flex-1 p-6 transition-all duration-300 ease-in-out">

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DaySalesCard />
          <DiningPreferencesCard />
          <MenuCategoryCard />
          <TopMenuItemsCard />
          <MonthlySalesChart />
        </div>
      </main>
    </div>
  );
}
