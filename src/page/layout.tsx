import Sidebar from "@/components/sidebar";
import { useState } from "react";
import MainContent from "@/components/maincontent";
import Submenu from "@/components/submenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 });

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleChartAccountsHover = (
    show: boolean,
    position?: { x: number; y: number }
  ) => {
    setSubmenuVisible(show);
    if (position) {
      setSubmenuPosition(position);
    }
  };
  return (
    <div className="h-screen flex bg-gray-100">
      {/* <AppSidebar /> */}
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        onChartAccountsHover={handleChartAccountsHover}
      />
      <MainContent />
      <Submenu
        isVisible={submenuVisible}
        position={submenuPosition}
        onMouseEnter={() => setSubmenuVisible(true)}
        onMouseLeave={() => setSubmenuVisible(false)}
      />
    </div>
  );
}
