import { Suspense } from "react";

import { getHTSession } from "~/app/api/auth/session";
import { SignOutButton } from "~/app/components/buttons";

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
