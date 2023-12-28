import { PropsWithChildren } from "react";

import { cn } from "../utils";

export const HTLogo = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => (
  <span className={cn("font-llpixel text-brand", className)}>{children}</span>
);

export const HTXLogoDuotone = () => (
  <HTLogo>
    Hack TUES <span className="text-sand">X</span>
  </HTLogo>
);
