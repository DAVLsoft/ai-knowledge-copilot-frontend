"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const itemContent = (
            <>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </>
          );

          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<NavLink to={item.url} aria-label={item.title} />}
                  isActive={pathname === item.url}
                  tooltip={item.title}
                >
                  {itemContent}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger
                  render={<SidebarMenuButton tooltip={item.title} />}
                >
                  {itemContent}
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-in-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none [&[hidden]:not([hidden='until-found'])]:hidden">
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          render={<NavLink to={subItem.url} />}
                          isActive={pathname === subItem.url}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
