import { Analytics } from "@vercel/analytics/react";

import { Footer } from "../components/footer";
import { Header } from "../components/header/header";
import { Separator } from "../components/ui/separator";

export default function FullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
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
