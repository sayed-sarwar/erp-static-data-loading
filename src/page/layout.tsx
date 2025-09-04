import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-[calc(100%-var(--sidebar-width))] ml-auto min-h-screen ">
        <header className="h48px flex">XYZ Builders</header>
        <SidebarTrigger className="fixed bottom-0" />
        {children}
      </div>
    </SidebarProvider>
  );
}
