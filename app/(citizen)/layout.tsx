import { CitizenSidebar } from "@/components/dashboard";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <CitizenSidebar />
        <SidebarInset>
          {/* Mobile top bar with sidebar trigger */}
          <header className="flex md:hidden sticky top-0 z-10 items-center gap-3 px-4 h-14 bg-background border-b border-border shrink-0">
            <SidebarTrigger />
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
