import AppFooter from "@/components/AppFooter";
import AppNavbar from "@/components/AppNavbar";
import { Toaster } from "@/components/ui/sonner";

export default function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <AppNavbar />
      <div className="flex-grow flex flex-col items-center">{children}</div>
      <AppFooter />
      <Toaster richColors position="top-right" />
    </main>
  );
}
