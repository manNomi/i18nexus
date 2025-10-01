import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { translations } from "@/lib/i18n";
import { cookies } from "next/headers";
import ClientProvider from "./components/ClientProvider";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "i18nexus - Complete React i18n toolkit",
  description:
    "Complete React i18n toolkit with cookie-based language management, Google Sheets integration, and automatic code transformation tools",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const currentLanguage = cookieStore.get("i18n-language")?.value || "en";

  return (
    <html lang={currentLanguage} className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden`}>
        <ClientProvider
          translations={translations}
          initialLanguage={currentLanguage}>
          <div className="flex h-full">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </ClientProvider>
      </body>
    </html>
  );
}
