"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";

import { NotificationsPopover } from "../notifications/_components/notifications-popover";
import { DesktopNavigation, MobileNavigation } from "./navigation-server";

export const Header = () => {
  const { scrollY } = useScroll();

  const MAX_OPACITY = 0.7;

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
      <NotificationsPopover />
      <MobileNavigation className="md:hidden" />
    </animated.header>
  );
};
