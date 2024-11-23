"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";
import { LogOutIcon, User } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  IfAnyHTFeatureOn,
  IfHTFeatureOn,
} from "~/app/_integrations/components";
import { NotificationsPopover } from "~/app/_notifications/_components/notifications-popover";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";
import { SignInButton, SignOutButton } from "../buttons";
import CustomizableDialog from "../CustomizableDialog";
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
        // @ts-expect-error because it works, even though the types don't let me pass variables
        "--header-bg-opacity": scrollY
          .to([0, 100], [0, MAX_OPACITY])
          .to((x) => Math.min(x, MAX_OPACITY)),
      }}
      className="sticky top-0 z-40 flex items-center gap-6 bg-background/[var(--header-bg-opacity)] px-6 py-6 backdrop-blur-md md:py-4"
    >
      <a
        href="#main-content"
        className="absolute left-1 top-1 z-50 -translate-y-[130%] bg-background/90 p-1 font-semibold ring-offset-background transition-transform focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Към съдържанието
      </a>
      <Link
        href="/"
        className="rounded-sm text-center font-llpixel text-2xl text-brand ring-offset-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Hack TUES X
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
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="focus-visible:ring-offset-3 hidden rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden rounded-full focus:bg-white/0 md:inline-flex"
                    asChild
                  >
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback className="uppercase">
                        {headerData.avatarName.at(0) ?? <User />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{headerData.avatarName}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="hidden items-center sm:block md:max-w-[12rem]">
            <DropdownMenuLabel className="text-wrap justify-center text-ellipsis py-3 text-center">
              Здравейте, {headerData.avatarName}
            </DropdownMenuLabel>
            <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
              <Link href="/profile" className="w-full py-3 text-center">
                Моят профил
              </Link>
            </DropdownMenuItem>
            {headerData.participant && headerData.participant.team != null && (
              <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
                <Link
                  href={`/teams/${headerData.participant.team}`}
                  className="w-full py-3 text-center"
                >
                  Моят отбор
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="w-full items-center justify-center hover:bg-white/10">
              <div onClick={(event) => event.stopPropagation()}>
                <CustomizableDialog
                  dialogTitle="Изход"
                  dialogDescription="Сигурни ли сте, че искате да излезете от акаунта си?"
                  actionTitle="Изход"
                  cancelTitle="Назад"
                  actionFunction={() => {
                    signOut();
                  }}
                >
                  <div className="hover:bg-current/10 flex items-center focus:bg-current">
                    <LogOutIcon className="scale-90 text-center text-destructive" />
                    <p className="focus:bg-current/10 hover:bg-current/10 ml-2 text-center text-destructive">
                      Изход
                    </p>
                  </div>
                </CustomizableDialog>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {headerData && headerData.avatarName === null && (
        <div className="hidden gap-2 md:flex">
          <IfHTFeatureOn feature="register-students">
            <Button variant="secondary" asChild>
              <Link href="/signup">Регистрация</Link>
            </Button>
          </IfHTFeatureOn>
          <IfHTFeatureOn feature="signin-students">
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
          </IfHTFeatureOn>
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
