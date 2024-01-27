import { PropsWithChildren } from "react";
import { Metadata } from "next";

import {
  ALPHA_SPONSORS,
  BETA_SPONSORS,
  GAMMA_SPONSORS,
  MEDIA_PARTNERS,
  PARTNERS,
} from "~/app/_configs/podkrepq";
import PodkrepqAutoDisplay from "~/app/components/podkrepq-auto-display";

export const metadata: Metadata = {
  title: "Спонсори и партньори",
  description:
    "Компании, които подкрепиха десетото юбилейно издание на Hack TUES X и ни помогнаха да го осъществим.",
};

export default function Podkrepq() {
  return (
    <>
      <SponsorsAndPartners />
    </>
  );
}

function SponsorsAndPartners() {
  return (
    <section className="light relative flex flex-col gap-14 overflow-x-visible pb-14 pt-14 text-sand-foreground">
      <div className="absolute -left-[calc(100vw-100%)] bottom-0 top-0 -z-10 h-full w-[calc(100vw+(100vw-100%)/2)]" />
      <div className="grid grid-cols-1 place-items-center ">
        <div className="mb-52">
          <PodkrepqTitle>Алфа Спонсори</PodkrepqTitle>
          <PodkrepqAutoDisplay podkrepqshti={ALPHA_SPONSORS} imagePriority />
        </div>
        <div className="mb-52">
          <PodkrepqTitle>Бета Спонсори</PodkrepqTitle>
          <PodkrepqAutoDisplay podkrepqshti={BETA_SPONSORS} />
        </div>
        <div className="mb-52">
          <PodkrepqTitle>Гама Спонсори</PodkrepqTitle>
          <PodkrepqAutoDisplay podkrepqshti={GAMMA_SPONSORS} />
        </div>
        <div className="mb-52">
          <PodkrepqTitle>Партньори</PodkrepqTitle>
          <PodkrepqAutoDisplay podkrepqshti={PARTNERS} />
        </div>
        <div className="mb-20 place-self-center">
          <PodkrepqTitle>Медийни Партньори</PodkrepqTitle>
          <PodkrepqAutoDisplay podkrepqshti={MEDIA_PARTNERS} />
        </div>
      </div>
    </section>
  );
}

function PodkrepqTitle({ children }: PropsWithChildren<{}>) {
  return (
    <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight text-sand first:mt-0 md:text-5xl">
      {children}
    </h2>
  );
}
