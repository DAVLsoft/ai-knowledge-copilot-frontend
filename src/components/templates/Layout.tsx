import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/organisms/Sidebar/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" />

      <main>
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
