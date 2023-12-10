import { BellIcon, BellRing } from "lucide-react";

import { Button } from "~/app/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/components/ui/tooltip";
import { HTNotification } from "../service";

export const NotificationsPopover = ({
  notifications,
}: {
  notifications: HTNotification[];
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <NotificationIcon hasNotifications={notifications.length > 0} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{notifications.length} непрочетени</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const NotificationIcon = ({
  hasNotifications,
  className,
}: {
  hasNotifications: boolean;
  className?: string;
}) =>
  !hasNotifications ? (
    <span className="relative">
      <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-destructive" />
      <div className="absolute right-0 top-0 -z-10 h-3 w-3 scale-150 animate-pulse rounded-full bg-[radial-gradient(hsl(var(--destructive))_10%,hsl(var(--destructive)/0)_70%)]" />
      <BellRing />
    </span>
  ) : (
    <BellIcon />
  );
