import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackTues 10",
  description:
    "HackTues 10 is the most popular hackathon in Bulgaria made for students by students.",
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
          <main className="flex min-h-screen items-start justify-center p-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
