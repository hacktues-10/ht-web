"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";
import { useQuery } from "@tanstack/react-query";

import { DesktopNavigation, MobileNavigation } from "../navigation-server";
import { getHeaderData } from "./actions";

export const Header = () => {
  const MAX_OPACITY = 0.7;

  const { scrollY } = useScroll();

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
        Hack TUES <span className="text-sand">X</span>
      </Link>
      <DesktopNavigation className="hidden md:block" />
      <div className="w-full flex-1" />

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
