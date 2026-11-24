import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/organisms/Sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
