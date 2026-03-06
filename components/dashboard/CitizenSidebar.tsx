"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  MessageSquare,
  Bell,
  User,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const NAV_LINKS = [
  { label: "Dashboard", href: "/citizen/dashboard", icon: LayoutDashboard },
  { label: "New Request", href: "/citizen/submit", icon: PlusCircle },
  { label: "My Requests", href: "/citizen/requests", icon: ListOrdered },
  { label: "Messages", href: "/citizen/messages", icon: MessageSquare },
  { label: "Notifications", href: "/citizen/notifications", icon: Bell },
  { label: "Profile", href: "/citizen/profile", icon: User },
];

interface CitizenSidebarProps {
  userName?: string;
  location?: string;
}

export function CitizenSidebar({
  userName = "Alex",
  location = "Red Deer",
}: CitizenSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      {/* User profile */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="size-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0"
            aria-hidden="true"
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sidebar-foreground text-sm font-semibold truncate">
              {userName}
            </span>
            <span className="text-sidebar-foreground/60 text-xs">
              {location}
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_LINKS.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <SidebarMenuItem key={href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                    >
                      <Link
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon aria-hidden="true" />
                        <span>{label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout */}
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" aria-label="Logout">
              <LogOut aria-hidden="true" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
