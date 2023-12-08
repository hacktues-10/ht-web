import "./globals.css";

import type { Metadata } from "next";
import { Commissioner, Inter } from "next/font/google";

import AuthProvider from "./context/AuthProvider";
import { GrowthBookServerProvider } from "./context/growthbook/GrowthBookServerProvider";
import { cn } from "./utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
//Commissioner
const title = Commissioner({ subsets: ["latin"], variable: "--font-title" });

export const metadata: Metadata = {
  title: "Hack TUES X",
  description:
    "Hack TUES X is the most popular hackathon in Bulgaria made for students by students.",
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
          title.variable,
        )}
      >
        <AuthProvider>
          <GrowthBookServerProvider>
            <main className="flex min-h-screen items-start justify-center p-6">
              {children}
            </main>
          </GrowthBookServerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
