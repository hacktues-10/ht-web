"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { LogOutIcon, UserCircle2 } from "lucide-react";

import { IfAnyHTFeatureOn } from "~/app/_integrations/components";
import { NotificationsPopover } from "~/app/_notifications/_components/notifications-popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import { IfTEAM } from "../../(full-layout)/teams/components";
import { SignInButton, SignOutButton } from "../buttons";
import { DesktopNavigation, MobileNavigation } from "../navigation-server";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
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
          <DropdownMenuTrigger className="mr-20">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden md:inline-flex"
                    asChild
                  >
                    <UserCircle2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{headerData.avatarName}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="items-center text-center justify-center p-4">
              Здравей, {headerData.avatarName}
            </DropdownMenuLabel>
            <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10 md:inline-flex">
              <Link href="/profile" className="w-full py-5 text-center">
                Профил
              </Link>
            </DropdownMenuItem>
            {headerData.participant?.team && (
              <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10 md:inline-flex">
                <Link href="/teams/myteam" className="w-full py-5 text-center">
                  Моят отбор
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="w-full py-4 items-center justify-center hover:bg-white/10 md:inline-flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hidden md:inline-flex"
                      asChild
                    >
                      <SignOutButton>
                        <div className="flex px-20">
                        <LogOutIcon className="scale-90 content-center"/>
                        <p className="ml-2 content-center">Изход</p>
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
