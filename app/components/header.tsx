"use client";

import Link from "next/link";
import { animated, useScroll } from "@react-spring/web";

export const Header = () => {
  const { scrollY } = useScroll();

  return (
    <animated.header
      style={{
        // @ts-ignore because it works, even though the types don't let me pass variables
        "--header-bg-opacity": scrollY
          .to([0, 100], [0, 0.5])
          .to((x) => Math.min(x, 0.5)),
      }}
      className="sticky top-0 z-50 flex items-center justify-between gap-4 bg-background/[var(--header-bg-opacity)] px-6 py-6 backdrop-blur-md md:py-4"
    >
      <Link href="/" className="text-center font-llpixel text-2xl text-brand">
        Hack TUES <span className="text-sand">X</span>
      </Link>
      <div></div>
    </animated.header>
  );
};
