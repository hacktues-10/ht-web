import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import AuthProvider from "./context/AuthProvider";
import { GrowthBookServerProvider } from "./context/growthbook/GrowthBookServerProvider";
import { cn } from "./utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const llpixel = localFont({
  src: "./assets/llpixel3.ttf",
  variable: "--font-llpixel",
});

export const metadata: Metadata = {
  title: "Hack TUES 10",
  description:
    "Hack TUES 10 is the most popular hackathon in Bulgaria made for students by students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "dark min-h-screen bg-background font-sans antialiased",
          inter.variable,
          llpixel.variable,
        )}
      >
        <AuthProvider>
          <GrowthBookServerProvider>
            <main className="flex min-h-screen items-start justify-center overflow-x-clip p-6">
              {children}
            </main>
          </GrowthBookServerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
