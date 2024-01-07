import "./globals.css";

import type { Metadata } from "next";
import { Inter, Noto_Sans, Roboto_Mono, Ubuntu } from "next/font/google";
import localFont from "next/font/local";

import AuthProvider from "~/app/_context/auth-provider";
import { GrowthBookServerProvider } from "~/app/_context/growthbook/GrowthBookServerProvider";
import { HTQueryClientProvider } from "./_context/query-client-provider";
import { Toaster } from "./components/ui/toaster";
import { cn } from "./utils";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const llpixel = localFont({
  src: "./assets/htpixel.ttf",
  variable: "--font-llpixel",
});

const lazydog = localFont({
  src: "./assets/lazydog.woff2",
  variable: "--font-lazydog",
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
    <html lang="en" className="motion-safe:scroll-smooth">
      <body
        className={cn(
          "dark relative min-h-screen bg-background font-sans antialiased",
          inter.variable,
          llpixel.variable,
          lazydog.variable,
        )}
      >
        <div className="absolute inset-0 -z-50 h-full bg-[url(./assets/bg-grid.png)] bg-[length:80px_80px] bg-repeat-round [mask-image:linear-gradient(to_bottom,transparent,10%,white,90%,transparent)]" />
        <AuthProvider>
          <GrowthBookServerProvider>
            <HTQueryClientProvider>{children}</HTQueryClientProvider>
            <Toaster />
          </GrowthBookServerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
