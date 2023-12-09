import "./globals.css";

import type { Metadata } from "next";
import { Inter, Noto_Sans, Roboto_Mono, Ubuntu } from "next/font/google";

import AuthProvider from "./context/AuthProvider";
import { GrowthBookServerProvider } from "./context/growthbook/GrowthBookServerProvider";
import { cn } from "./utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});
//Commissioner
// const parahraph = Ubuntu({
//   subsets: ["cyrillic"],
//   weight: "400",
//   style: "italic",
//   variable: "--font-paragraph",
// });
const parahraph = Noto_Sans({
  subsets: ["cyrillic"],
  weight: "500",
  style: "normal",
  variable: "--font-paragraph",
});
const htags = Roboto_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-htags",
});

const title = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: "600",
  variable: "--font-title",
});

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
          htags.variable,
          title.variable,
          parahraph.variable,
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
