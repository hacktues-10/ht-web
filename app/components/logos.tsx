import { PropsWithChildren } from "react";

import { cn } from "../utils";

export const HTLogo = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <span className={cn("font-llpixel font-medium", className)}>{children}</span>
);

// TODO: make this your own
export const HTCurrentEventLogo = () => (
  <HTLogo className="text-primary">
    Hack&nbsp;TUES&nbsp;<span className="text-slate-400">X</span>
  </HTLogo>
);
