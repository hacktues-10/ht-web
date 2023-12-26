"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { LogOutIcon, UserCircle2 } from "lucide-react";

import { IfAnyHTFeatureOn } from "~/app/_integrations/components";
import { NotificationsPopover } from "~/app/_notifications/_components/notifications-popover";
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
      {/* TODO: make this a dropdown of the pfp */}
      {headerData && headerData.avatarName && (
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
                  <LogOutIcon />
                </SignOutButton>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Изход</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {headerData && headerData.avatarName !== null && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="hidden md:inline-flex"
                asChild
              >
                <Link href="/profile">
                  <UserCircle2 />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{headerData.avatarName}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
                <Link href="/login" className="pointer-events-none">
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
