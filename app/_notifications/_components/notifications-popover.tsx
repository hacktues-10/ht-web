import { useQueryClient } from "@tanstack/react-query";
import { BellIcon, BellRing } from "lucide-react";

import { Button } from "~/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/components/ui/tooltip";
import NotificationItem from "./notification";

type HTNotification = any;

export const NotificationsPopover = ({
  notifications,
  ignoreNotificationTypes = [],
  participant,
}: {
  notifications: HTNotification[];
  ignoreNotificationTypes?: HTNotification["type"][];
  participant: { id: number; isLookingForTeam: boolean };
}) => {
  const queryClient = useQueryClient();

  return (
    <Popover
      onOpenChange={(open) =>
        // XXX: hardcoded query key
        open && queryClient.invalidateQueries({ queryKey: ["header"] })
      }
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <NotificationIcon hasNotifications={notifications.length > 0} />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>{notifications.length} непрочетени</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-96 sm:ml-auto sm:w-[67%]">
        <div className="flex flex-col gap-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                participant={participant}
              />
            ))
          ) : (
            <p className="w-80 overflow-auto px-2 py-4 text-center text-xs text-white/80 sm:text-left  ">
              Няма непрочетени съобщения
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const NotificationIcon = ({
  hasNotifications,
  className,
}: {
  hasNotifications: boolean;
  className?: string;
}) =>
  hasNotifications ? (
    <span className="relative">
      <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-destructive" />
      <div className="absolute right-0 top-0 -z-10 h-3 w-3 scale-150 animate-pulse rounded-full bg-[radial-gradient(hsl(var(--destructive))_10%,hsl(var(--destructive)/0)_70%)]" />
      <BellRing />
    </span>
  ) : (
    <BellIcon />
  );
