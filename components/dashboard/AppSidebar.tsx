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
  Landmark,
  Settings2,
  Users,
  Map,
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
import NavUser from "./NavUser";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "New Request", href: "/dashboard/requests/new", icon: PlusCircle },
  { label: "My Requests", href: "/dashboard/requests", icon: ListOrdered },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings2 },
  { label: "Live Map", href: "/dashboard/map", icon: Map },
];

const user = {
  avatar: "",
  firstName: "Stephen",
  lastName: "Kilonzo",
  email: "skilonzo@gmail.com",
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      {/* User profile */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="size-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0"
            aria-hidden="true"
          >
            <Landmark />
          </span>
          <span className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sidebar-foreground text-sm font-semibold truncate">
              CivicFlow
            </span>
            <span className="text-sidebar-foreground/60 text-xs">
              Alberta Platform
            </span>
          </span>
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
                  <SidebarMenuItem key={href} className="mb-2">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                      className="font-medium py-4"
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
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
