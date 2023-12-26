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

const llpixel = localFont({
  src: "./assets/llpixel3.ttf",
  variable: "--font-llpixel",
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
          "dark relative min-h-screen bg-background font-sans antialiased",
          inter.variable,
          htags.variable,
          title.variable,
          parahraph.variable,
          llpixel.variable,
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
