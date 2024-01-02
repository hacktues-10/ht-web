"use client";

import { PropsWithChildren } from "react";
import { useSession } from "next-auth/react";

export function IfHTSession({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  return session ? children : null;
}

export function IfNotHTSession({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  return session ? null : children;
}
