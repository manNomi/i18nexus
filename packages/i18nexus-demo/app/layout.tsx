import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { translations } from "@/lib/i18n";

import { I18nProvider } from "i18nexus";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider translations={translations}>{children}</I18nProvider>
      </body>
    </html>
  );
}
