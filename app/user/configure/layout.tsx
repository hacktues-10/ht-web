import { Toaster } from "~/app/components/ui/toaster";

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      {children}
      <Toaster />
    </div>
  );
}
