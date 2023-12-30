import { PropsWithChildren } from "react";

import { cn } from "../utils";

export function PageBackdrop({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "absolute inset-y-0 left-1/2 -z-30 w-[300%] -translate-x-1/2 ",
        className,
      )}
      aria-hidden
    >
      {children}
    </div>
  );
}
