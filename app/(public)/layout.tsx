import AppFooter from "@/components/AppFooter";
import AppNavbar from "@/components/AppNavbar";

export default function PublicRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <AppNavbar />
      <div className="w-full flex-1 min-h-screen">{children}</div>
      <AppFooter />
    </main>
  );
}
