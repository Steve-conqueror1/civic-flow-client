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
      <div className="flex-grow flex flex-col items-center">{children}</div>
      <AppFooter />
    </main>
  );
}
