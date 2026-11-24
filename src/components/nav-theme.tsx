"use client";

import { useEffect, useState } from "react";
import { Sun } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";

function getInitialLightMode() {
  if (typeof window === "undefined") {
    return true;
  }

  const savedTheme = window.localStorage.getItem("theme");
  return savedTheme
    ? savedTheme !== "dark"
    : !document.documentElement.classList.contains("dark");
}

export function NavTheme() {
  const [lightMode, setLightMode] = useState(getInitialLightMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", !lightMode);
    window.localStorage.setItem("theme", lightMode ? "light" : "dark");
  }, [lightMode]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:hover:bg-transparent group-data-[collapsible=icon]:hover:text-sidebar-foreground">
          <Sun
            className="size-4 shrink-0 group-data-[collapsible=icon]:hidden"
            aria-hidden="true"
          />
          <span className="flex-1 truncate group-data-[collapsible=icon]:hidden">
            Light mode
          </span>
          <Switch
            checked={lightMode}
            onCheckedChange={setLightMode}
            aria-label="Light mode"
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
