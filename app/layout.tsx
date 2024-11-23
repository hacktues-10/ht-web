import "./globals.css";

import type { Metadata } from "next";
import { Inter, Noto_Sans, Roboto_Mono, Ubuntu } from "next/font/google";
import localFont from "next/font/local";

import AuthProvider from "~/app/_context/auth-provider";
import { GrowthBookServerProvider } from "~/app/_context/growthbook/GrowthBookServerProvider";
import { HT_EDITION_NAME } from "./_configs/hackathon";
import { HTQueryClientProvider } from "./_context/query-client-provider";
import { Toaster } from "./components/ui/toaster";
import { HT_EDITION_NAME, cn } from "./utils";
import { HT_EVENT_HEADLINE } from "./_configs/pr";

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
      `${HT_EDITION_NAME} – ${HT_EVENT_HEADLINE}`,
    template: `%s | ${HT_EDITION_NAME}`,
  },
  description: HT_EVENT_HEADLINE,
  openGraph: {
    title: {
      default: HT_EDITION_NAME,
      template: `%s | ${HT_EDITION_NAME}`,
    },
    description:
      `${HT_EVENT_HEADLINE}.`,
    url: "https://hacktues.bg",
    siteName: HT_EDITION_NAME,
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
    title: HT_EDITION_NAME,
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
    <html lang="en" className="motion-safe:scroll-smooth ">
      <body
        className={cn(
          "dark relative min-h-screen font-sans antialiased",
          inter.variable,
          llpixel.variable,
          lazydog.variable,
        )}
      >
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
