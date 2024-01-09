import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

import { Footer } from "../components/footer";
import { Header } from "../components/header/header";
import { Separator } from "../components/ui/separator";
import { Toaster } from "../components/ui/toaster";

export default function FullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Link
        href="#main-content"
        className="absolute left-1 top-1 z-50 -translate-y-full bg-background/90 p-1 font-semibold ring-offset-background transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Към съдържанието
      </Link>
      <Header />
      <main
        id="main-content"
        className="flex h-full flex-1 flex-col items-center justify-start overflow-x-clip p-6"
      >
        {children}
        <Analytics />
      </main>
      <div className="pt-32 md:pt-8" />
      <Separator />
      <Footer />
    </div>
  );
}
