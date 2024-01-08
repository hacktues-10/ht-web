"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { LogOutIcon, User } from "lucide-react";

import { IfAnyHTFeatureOn } from "~/app/_integrations/components";
import { NotificationsPopover } from "~/app/_notifications/_components/notifications-popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import { SignInButton, SignOutButton } from "../buttons";
import { DesktopNavigation, MobileNavigation } from "../navigation-server";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import { getHeaderData } from "./actions";

export const Header = () => {
  const MAX_OPACITY = 0.7;

  const { scrollY } = useScroll();
  const { data: headerData } = useHeaderData();

  headerData?.participant;

  return (
    <animated.header
      style={{
        // @ts-ignore because it works, even though the types don't let me pass variables
        "--header-bg-opacity": scrollY
          .to([0, 100], [0, MAX_OPACITY])
          .to((x) => Math.min(x, MAX_OPACITY)),
      }}
      className="sticky top-0 z-50 flex items-center gap-6 bg-background/[var(--header-bg-opacity)] px-6 py-6 backdrop-blur-md md:py-4"
    >
      <Link
        href="/"
        className="text-center font-llpixel text-2xl text-brand transition-transform hover:scale-105"
      >
        Hack TUES <span className="text-sand">X</span>
      </Link>
      <DesktopNavigation className="hidden md:block" />
      <div className="w-full flex-1" />
      {headerData &&
        headerData.notifications !== null &&
        headerData.participant && (
          <NotificationsPopover
            notifications={headerData.notifications}
            participant={headerData.participant}
          />
        )}
      {headerData && headerData.avatarName !== null && (
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden rounded-full outline-0 ring-0 md:inline-flex focus:bg-white/0"
                    asChild
                  >
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback>{headerData.avatarName.at(0) ?? <User />}</AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{headerData.avatarName}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:max-w-[12rem] items-center">
            <DropdownMenuLabel className="text-center text-wrap text-ellipsis justify-center py-3">
              Здравейте, {headerData.avatarName}
            </DropdownMenuLabel>
            <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
              <Link href="/profile" className="w-full text-center py-3">
                Моят Профил
              </Link>
            </DropdownMenuItem>
            {headerData.participant && headerData.participant.team != null && (
              <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
                <Link href="/teams/myteam" className="w-full text-center py-3">
                  Моят отбор
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="default"
                      variant="ghost"
                      className="w-full h-full py-2 px-0 hidden md:inline-flex focus:bg-current/10 hover:bg-current/10"
                      asChild
                    >
                      <SignOutButton>
                        <div className="flex focus:bg-current hover:bg-current/10">
                        <LogOutIcon className="scale-90 content-center"/>
                        <p className="ml-2 content-center text-destructive focus:bg-current/10 hover:bg-current/10">Изход</p>
                        </div>
                      </SignOutButton>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Изход</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {headerData && headerData.avatarName === null && (
        <div className="hidden gap-2 md:flex">
          <IfAnyHTFeatureOn outOf={["register-alumni", "register-students"]}>
            <Button variant="secondary" asChild>
              <Link href="/signup">Регистрация</Link>
            </Button>
          </IfAnyHTFeatureOn>
          <IfAnyHTFeatureOn outOf={["signin-alumni", "signin-students"]}>
            <Button asChild>
              <SignInButton>
                <Link
                  href="/login"
                  tabIndex={-1}
                  className="pointer-events-none"
                >
                  Вход
                </Link>
              </SignInButton>
            </Button>
          </IfAnyHTFeatureOn>
        </div>
      )}
      <MobileNavigation className="md:hidden" />
    </animated.header>
  );
};

export function useHeaderData() {
  return useQuery({
    queryKey: ["header"],
    queryFn: () => getHeaderData(),
    refetchInterval: 1000 * 60 * 2,
  });
}
