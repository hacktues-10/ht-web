import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";

import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import AuthProvider from "./context/AuthProvider";
import { GrowthBookServerProvider } from "./context/growthbook/GrowthBookServerProvider";
import { SOCIAL_MEDIA, SocialMedia } from "./pr";
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
            <Separator />
            <Footer />
          </GrowthBookServerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

const MediaIconButton = ({ media }: { media: SocialMedia }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          asChild
          className="transition-transform hover:scale-110"
        >
          <Link href={media.link} target="_blank">
            <media.icon />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{media.handle}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Footer = () => (
  <footer className="flex flex-col items-center justify-between gap-4 px-6 py-2 md:flex-row">
    <Link
      href="/"
      className="text-center font-llpixel text-2xl text-brand md:text-xl"
    >
      Hack TUES <span className="text-sand">X</span>
    </Link>
    <p className="text-center text-sm text-gray-500">
      © {new Date().getFullYear()} ТУЕС към ТУ-София. Всички права запазени.
    </p>
    <Separator decorative={true} className="w-48 md:hidden" />
    <ul className="flex">
      {SOCIAL_MEDIA.filter((media) => media.showInFooter).map((media) => (
        <li key={media.platform}>
          <MediaIconButton media={media} />
        </li>
      ))}
      {/* IDEAL: show all media on small screens (looks bad) */}
      {/* {SOCIAL_MEDIA.filter((media) => !media.showInFooter).map(
                    (media) => (
                      <li key={media.platform} className="md:hidden">
                        <MediaIconButton media={media} />
                      </li>
                    ),
                  )} */}
    </ul>
  </footer>
);
