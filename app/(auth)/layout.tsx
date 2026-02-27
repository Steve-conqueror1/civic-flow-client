import AuthNavbar from "@/components/auth/AuthNavbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-col">
      <AuthNavbar />
      <div className="flex-grow flex flex-col items-center bg-background">
        {children}
      </div>
    </main>
  );
}
