"use client";

import React, { PropsWithChildren, useState } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { LogOutIcon, Menu, User2 } from "lucide-react";

import { IfAnyHTFeatureOn, IfHTFeatureOn } from "../_integrations/components";
import { cn } from "../utils";
import { SignInButton, SignOutButton } from "./buttons";
import { SocialMediaIconRow } from "./footer";
import { useHeaderData } from "./header/header";
import { HTEditionLogo, HTLogo } from "./logos";
import { Button } from "./ui/button";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const MobileNavigationRoot = ({
  className,
  children,
}: PropsWithChildren<{ className: string }>) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: headerData } = useHeaderData();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className={className} asChild>
        <Button size="icon" variant="ghost">
          <Menu />
          <span className="sr-only">
            {isSheetOpen ? "Скрий" : "Покажи"} менюто
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center gap-10 py-8">
        <MobileNavLink
          href="/"
          onOpenChange={setIsSheetOpen}
          className="text-3xl transition-transform hover:scale-105"
        >
          <HTEditionLogo />
        </MobileNavLink>
        <ScrollArea className="h-full flex-1 overflow-scroll">
          {/* HACK: because the children are rendered by the server and they need to access the state setter,
                    we're passing it by context. Don't know if good idea, but it works (i think...) */}
          <SheetContext.Provider
            value={{
              onOpenChange: setIsSheetOpen,
            }}
          >
            {children}
          </SheetContext.Provider>
        </ScrollArea>
        <Separator />
        {headerData && headerData.avatarName ? (
          <MobileActionButtons>
            <MobileNavLink
              href="/profile"
              onOpenChange={setIsSheetOpen}
              className={cn(
                navigationMenuTriggerStyle(),
                "flex w-full justify-evenly gap-2 text-lg",
              )}
            >
              <User2 /> Профил
            </MobileNavLink>
            <SignOutButton
              className={cn(
                navigationMenuTriggerStyle(),
                "flex w-full justify-evenly gap-2 text-lg text-destructive hover:text-[#fc3f6e]",
              )}
            >
              <LogOutIcon /> Изход
            </SignOutButton>
          </MobileActionButtons>
        ) : (
          <IfAnyHTFeatureOn outOf={["signin-students", "register-students"]}>
            <MobileActionButtons>
              <IfHTFeatureOn feature="signin-students">
                <SignInButton
                  className={cn(navigationMenuTriggerStyle(), "w-full text-lg")}
                >
                  Вход
                </SignInButton>
              </IfHTFeatureOn>
              <IfHTFeatureOn feature="register-students">
                <SignInButton
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "w-full text-lg text-primary",
                  )}
                >
                  Регистрация
                </SignInButton>
              </IfHTFeatureOn>
            </MobileActionButtons>
          </IfAnyHTFeatureOn>
        )}
        <SocialMediaIconRow isMobile />
      </SheetContent>
    </Sheet>
  );
};

function MobileNavLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

const MobileActionButtons = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-1">{children}</div>
);

type SheetContext = {
  onOpenChange: (open: boolean) => void;
};

const SheetContext = React.createContext<SheetContext | null>(null);

export const MobileNavLinkServer = (
  props: Exclude<MobileLinkProps, "onOpenChange">,
) => {
  const sheetContext = React.useContext(SheetContext);
  return <MobileNavLink {...props} onOpenChange={sheetContext?.onOpenChange} />;
};
