"use client";

import { PropsWithChildren, useState } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/app/components/ui/navigation-menu";
import { cn } from "../utils";
import { SocialMediaIconRow } from "./footer";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

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
