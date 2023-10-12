import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "./context/AuthProvider";
import { GrowthBookServerProvider } from "./context/growthbook/GrowthBookServerProvider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
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
