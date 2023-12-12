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
    <>
      <Header />
      <main className="flex min-h-screen items-start justify-center overflow-x-clip p-6">
        {children}
      </main>
      <Toaster />
      <Separator />
      <Footer />
    </>
  );
}
