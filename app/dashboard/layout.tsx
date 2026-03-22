import { AppSidebar } from "@/components/dashboard";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex md:hidden sticky top-0 z-10 items-center gap-3 px-4 h-14 bg-background border-b border-border shrink-0">
            <SidebarTrigger className="hover:cursor-pointer" />
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              CivicFlow
            </span>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
