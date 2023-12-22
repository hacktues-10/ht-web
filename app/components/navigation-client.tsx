"use client";

import { PropsWithChildren, useState } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { LogOutIcon, Menu, User2 } from "lucide-react";

import { IfAnyHTFeatureOn } from "../_integrations/components";
import { cn } from "../utils";
import { SignInButton, SignOutButton } from "./buttons";
import { SocialMediaIconRow } from "./footer";
import { useHeaderData } from "./header/header";
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
          className="font-llpixel text-3xl text-sand transition-transform hover:scale-105"
        >
          Hack TUES X
        </MobileNavLink>
        {/* FIXME: ScrollArea doesnt work */}
        <ScrollArea className="h-full flex-1">{children}</ScrollArea>
        <Separator />
        {headerData && (
          <div className="flex flex-col gap-1">
            {headerData.avatarName ? (
              <>
                <MobileNavLink
                  href="/profile"
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
              </>
            ) : (
              <>
                <IfAnyHTFeatureOn outOf={["signin-alumni", "signin-students"]}>
                  <SignInButton
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full text-lg",
                    )}
                  >
                    Вход
                  </SignInButton>
                </IfAnyHTFeatureOn>
                <IfAnyHTFeatureOn
                  outOf={["register-alumni", "register-students"]}
                >
                  <SignInButton
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "w-full text-lg text-primary",
                    )}
                  >
                    Регистрация
                  </SignInButton>
                </IfAnyHTFeatureOn>
              </>
            )}
          </div>
        )}
        <SocialMediaIconRow />
      </SheetContent>
    </Sheet>
  );
};

export function MobileNavLink({
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
