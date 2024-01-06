import Image, { ImageProps } from "next/image";

import { PageBackdrop } from "~/app/components/page-backdrop";
import leaves from "./leaves.webp";
import smartcity from "./smartcity.png";
import { HT1Book, HT1Line1, HT1Line2, HT1Line3 } from "./svgs/ht1";
import {
  HT2Bulb,
  HT2Interlinked,
  HT2Line1,
  HT2Line2,
  HT2Line3,
  HT2Recycle,
} from "./svgs/ht2";
import { HT3Line1, HT3Line2, HT3Line3 } from "./svgs/ht3";
import { HT4Layout1, HT4Layout2 } from "./svgs/ht4";
import {
  HT5Bug,
  HT5Cogwheel,
  HT5Lang,
  HT5Laptop,
  HT5Logs,
  HT5Robot,
  HT5Wifi,
} from "./svgs/ht5";
import { HT6Sun } from "./svgs/ht6";
import { HT7Wireframe } from "./svgs/ht7";
import {
  HT8BigPlanet,
  HT8Curve,
  HT8Lines1,
  HT8Lines2,
  HT8SmallPlanet,
  HT8Stars,
} from "./svgs/ht8";
import { HT9Curve1, HT9Curve2, HT9Curve3, HT9Lock } from "./svgs/ht9";

export const HT1Background = () => (
  <>
    <HT1Book className="absolute -left-3 bottom-24 -z-20 h-32 opacity-80 sm:left-16" />
    <HT1Line1 className="absolute -right-3 top-0 -z-20 h-44 translate-x-[50px] opacity-80 sm:right-9 sm:translate-x-0" />
    <HT1Line2 className="absolute -right-48 top-1/2 -z-20 h-10 opacity-80 sm:h-20" />
    <HT1Line3 className="absolute -right-8 bottom-0 -z-20 h-20 opacity-80 lg:h-28" />
  </>
);

export const HT2Background = () => (
  <>
    <HT2Bulb className="absolute bottom-20 left-24 -z-20 h-28 translate-x-20 opacity-80 sm:left-16" />
    <HT2Interlinked className="top-15 absolute -right-36 -z-20 h-28 opacity-80" />
    <HT2Recycle className="absolute right-2 top-5 -z-20 h-28 opacity-80 sm:right-16" />
    <HT2Line1 className="absolute -right-1/4 top-0 -z-20 h-72 translate-x-52 opacity-80 sm:right-9" />
    <HT2Line2 className="absolute -left-2 bottom-0 -z-20 h-60 opacity-80" />
    <HT2Line3 className="absolute -right-48 bottom-6 -z-20 h-10 opacity-80" />
  </>
);

export const HT3Background = () => (
  <>
    <HT3Line1 className="absolute left-0 top-1/3 -z-20 -translate-x-[320px] opacity-70" />
    <HT3Line2 className="absolute right-0 top-0 -z-20 -translate-y-9 translate-x-[240px] -rotate-[16deg] sm:translate-x-[400px] sm:scale-[60%] md:-translate-y-60" />
    <HT3Line3 className="absolute -bottom-12 left-0 -z-20 -translate-y-[48px] scale-75 sm:-left-60 sm:-translate-y-[28px]" />
  </>
);

export const HT4Background = () => (
  <>
    <HT4Layout1 className="absolute -left-10 bottom-0 -z-20 h-[450px] opacity-80" />
    <HT4Layout2 className="absolute bottom-0 right-[500px] -z-20 h-[95%] opacity-80 sm:-right-[540px]" />
  </>
);

export const HT5Background = () => (
  <>
    <HT5Wifi className="absolute right-0 top-4 -z-20 h-20 opacity-80 sm:right-16 sm:h-28" />
    <HT5Bug className="absolute -right-7 top-36 -z-20 h-28 opacity-80" />
    <HT5Robot className="absolute bottom-0 left-0 -z-20 h-28 opacity-80 sm:left-[10%]" />
    <HT5Cogwheel className="absolute -right-14 bottom-48 -z-20 h-28 opacity-80" />
    <HT5Laptop className="absolute bottom-20 right-0 -z-20 h-28 opacity-80" />
    <HT5Logs className="absolute bottom-10 right-44 -z-20 h-14 opacity-80 sm:bottom-8 sm:h-28" />
    <HT5Lang className="absolute bottom-2 right-[80px] -z-20 h-20 scale-90 opacity-80 sm:h-28" />
  </>
);

export const HT6Background = () => (
  <>
    <HT6Sun className="absolute bottom-0 left-1/2 -z-20 h-28 -translate-x-1/2" />
    <Image
      src={smartcity}
      alt="Smart City"
      className="absolute bottom-0 left-1/2 -z-20 -translate-x-1/2"
    />
  </>
);

export const HT7Background = () => (
  <>
    <HT7Wireframe className="-z-2 absolute inset-0 [mask-image:linear-gradient(to_right,transparent,10%,white,90%,transparent)]" />
    <div className="inset-0">
      <PageBackdrop className="h-full">
        <Image
          src={leaves}
          alt="Листа"
          // className="absolute bottom-0 left-1/2 -z-20 -translate-x-1/2 sm:max-h-80 sm:w-auto"
          className="absolute bottom-0 left-1/2 -z-20 -translate-x-1/2 sm:max-h-80 sm:w-auto"
        />
      </PageBackdrop>
    </div>
  </>
);

export const HT8Background = () => (
  <>
    <HT8Curve className="absolute inset-y-0 right-0 -z-20 h-full translate-x-32" />
    <HT8Stars className="absolute bottom-12 right-0 -z-20 h-96" />
    <HT8Lines1 className="absolute bottom-24 left-0 -z-20 h-32" />
    <HT8Lines2 className="absolute right-12 top-10 -z-20 h-64" />
    <HT8SmallPlanet className="absolute bottom-0 left-0 -z-20 h-36" />
    <HT8BigPlanet className="absolute right-0 top-0 -z-20 h-60" />
  </>
);

export const HT9Background = () => (
  <>
    <HT9Lock className="absolute right-0 top-1/4 -z-20 h-24" />
    <HT9Curve1 className="absolute -left-40 bottom-0 -z-20 h-96 sm:hidden" />
    <HT9Curve2 className="absolute right-0 top-0 -z-20 h-28" />
    <HT9Curve3 className="absolute -right-32 bottom-0 -z-20 h-80 sm:hidden" />
  </>
);
