import type { Metadata } from "next";
import { fontSans, fontMono } from "./fonts";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CivicFlow | AI-Enabled Public Service Requests for Alberta",
  description:
    "Simplify your interactions with Alberta’s public services. Submit infrastructure requests, track cases in real-time, and get AI-assisted guidance through the CivicFlow platform. Secure, accessible, and community-focused.",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
