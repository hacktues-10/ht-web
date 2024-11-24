import { PropsWithChildren } from "react";

import { cn } from "../utils";

export const HTLogo = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <span className={cn("font-htpixel font-medium", className)}>{children}</span>
);

// TODO: make this your own
export const HTEditionLogo = () => (
  <HTLogo>
    Hack&nbsp;<span className="text-primary">TUES</span>
  </HTLogo>
);
