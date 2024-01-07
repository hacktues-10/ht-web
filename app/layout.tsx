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
  metadataBase: new URL("https://hacktues.bg/"),
  title: {
    default:
      "Hack TUES X – Единственият хакатон в България, организиран от ученици за ученици!",
    template: "%s | Hack TUES X",
  },
  description: "Hack TUES",
  openGraph: {
    title: "Hack TUES X",
    description:
      "Единственият хакатон в България, организиран от ученици за ученици!",
    url: "https://hacktues.bg",
    siteName: "Hack TUES X",
    locale: "bg_BG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Hack TUES X",
    card: "summary_large_image",
  },
  // verification: {
  //   google: '...',
  //   yandex: '...',
  // },
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
