"use client";
import * as React from "react";

import { Logo } from "@/components/atoms/Logo";
import { NavMain } from "@/components/nav-main";
import { NavTheme } from "@/components/nav-theme";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Pin, History, PencilLine, File } from "lucide-react";

const data = {
  user: {
    name: "User1234",
    email: "user1234@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Documents",
      url: "#",
      icon: File,
    },
    {
      title: "New Chat",
      url: "#",
      icon: PencilLine,
    },
    {
      title: "Pinned",
      url: "#",
      icon: Pin,
      isActive: true,
      items: [
        {
          title: "Vacation/PTO policy",
          url: "#",
        },
        {
          title: "Work schedule/sick leave",
          url: "#",
        },
        {
          title: "Company details/templates",
          url: "#",
        },
      ],
    },
    {
      title: "History",
      url: "#",
      icon: History,
      isActive: true,
      items: [
        {
          title: "Customer service guidelines",
          url: "#",
        },
        {
          title: "How do I arrange a business trip?",
          url: "#",
        },
        {
          title: "Sample contract",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="py-6" {...props}>
      <SidebarHeader className="flex flex-row justify-between group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<a href="/" aria-label="Acme Inc. home" />}
              className="group-data-[collapsible=icon]:p-0!"
            >
              <Logo className="shrink-0" />
              <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">
                Acme Inc.
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavTheme />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
