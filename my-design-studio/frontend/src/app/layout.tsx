import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Design Studio",
  description: "Hybrid Design Engine Platform",
  icons: {
    icon: '/logo.webp',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} font-sans antialiased dark`}>
      <body className="min-h-screen flex flex-col bg-gray-950 text-gray-100 selection:bg-blue-500 selection:text-white">
        <SmoothScroller>
          <LanguageProvider>
            <CustomCursor />
            {children}
          </LanguageProvider>
        </SmoothScroller>
      </body>
    </html>
  );
}
