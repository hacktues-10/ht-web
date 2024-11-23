import { PropsWithChildren } from "react";

import { cn } from "../utils";

export const HTLogo = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <span className={cn("font-llpixel font-medium text-brand", className)}>
    {children}
  </span>
);

// TODO: make this your own
export const HTCurrentEventLogo = () => (
  <HTLogo>
    Hack&nbsp;TUES&nbsp;<span className="text-slate-400">X</span>
  </HTLogo>
);
