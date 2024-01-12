"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { getHackathonById } from "../_configs/archive";
import { Podkrepqsht } from "../_configs/podkrepq";
import { cn } from "../utils";
import { Card, CardContent, CardTitle } from "./ui/card";

export default function PodkrepqAutomationComponent({
  podkrepqshti,
}: {
  podkrepqshti: Podkrepqsht[];
}) {
  const [liveIndex, setLiveIndex] = useState(0);
  const nextIndex = liveIndex < podkrepqshti.length - 1 ? liveIndex + 1 : 0;
  const prevIndex = liveIndex === 0 ? podkrepqshti.length - 1 : liveIndex - 1;
  const prevPervIndex =
    prevIndex === 0 ? podkrepqshti.length - 1 : prevIndex - 1;
  const nextNextIndex = nextIndex < podkrepqshti.length - 1 ? nextIndex + 1 : 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveIndex((prevIndex) =>
        prevIndex === podkrepqshti.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [liveIndex, podkrepqshti.length]);

  return (
    <div className="flex items-center flex-wrap align-middle justify-center">
      <ul className="relative mx-auto mt-20 w-64 sm:w-72 md:w-80 lg:w-96">
        <div className="pb-[50%] pt-[20%] ">
          {podkrepqshti.map((podkrepqsht, index) => (
            <PodkrepqLogo
              key={podkrepqsht.name}
              podkrepqsht={podkrepqsht}
              index={index}
              prevIndex={prevIndex}
              liveIndex={liveIndex}
              nextIndex={nextIndex}
              nextNextIndex={nextNextIndex}
              prevPrevIndex={prevPervIndex}
              onClick={() => setLiveIndex(index)}
            />
          ))}
        </div>
      </ul>
      <div className="ml-10 hidden md:mt-10 md:block md:w-[400px] lg:mt-20 lg:w-[600px]">
        <Card className="w-full p-2">
          <CardTitle className="pt-5 text-center text-white">
            {podkrepqshti[liveIndex].name}
          </CardTitle>
          <CardContent className="p-5 text-white">
            <div className="max-h-[200px]">
              {shouldShowDescription(podkrepqshti[liveIndex].description) ? (
                <p>
                  {podkrepqshti[liveIndex].description?.substring(0, 270)}
                  ...&emsp;
                  <PodkrepqReadMore
                    url={podkrepqshti[liveIndex].url}
                    description={podkrepqshti[liveIndex].description}
                  />
                </p>
              ) : (
                <div className="flex h-[150px] flex-col items-center justify-center gap-1">
                  <p className="text-xl font-bold">
                    Благодарим на {podkrepqshti[liveIndex].name} за подкрепата!
                  </p>
                  <p>
                    <PodkrepqReadMore url={podkrepqshti[liveIndex].url} />
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center align-middle">
              {podkrepqshti[liveIndex].supportedEditions?.map((h) => {
                const hackathon = getHackathonById(h);
                if (hackathon)
                  return (
                    <div className="p-2" key={h}>
                      {hackathon.logo}
                    </div>
                  );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function shouldShowDescription(description?: string) {
  return description && !description.toLowerCase().includes("lorem ipsum");
}

function PodkrepqReadMore({
  description,
  url,
}: {
  description?: string;
  url: string;
}) {
  const link = (
    <Link className="font-semibold italic text-white" href={url}>
      Научи повече
    </Link>
  );
  return link;
}

function PodkrepqLogo({
  podkrepqsht,
  index,
  prevIndex,
  liveIndex,
  nextIndex,
  nextNextIndex,
  prevPrevIndex,
  onClick,
}: {
  podkrepqsht: Podkrepqsht;
  index: number;
  prevIndex: number;
  liveIndex: number;
  nextIndex: number;
  nextNextIndex: number;
  prevPrevIndex: number;
  onClick: () => void;
}) {
  return (
    <li
      className={cn(
        "absolute inset-0 my-4 [perspective:800px]",
        index === liveIndex && "z-10",
      )}
      title={podkrepqsht.name}
    >
      <Link
        href={podkrepqsht.url}
        onClick={
          [prevIndex, nextIndex].includes(index)
            ? (e) => {
                e.preventDefault();
                onClick();
              }
            : undefined
        }
        className={cn(
          "group z-0 grid aspect-video place-content-center overflow-clip rounded-lg bg-white p-4 opacity-0 shadow-md transition-all duration-700",
          index === prevIndex &&
            "z-10 opacity-50 [transform:rotateX(45deg)_translateY(-130%)] hover:opacity-75",
          index === liveIndex && "z-50 opacity-100 hover:scale-[112.5%]",
          index === nextIndex &&
            "z-10 opacity-50 [transform:rotateX(-45deg)_translateY(130%)] hover:opacity-75",
          index === nextNextIndex &&
            "pointer-events-none opacity-0 [transform:translateY(110%)_rotateX(-90deg)_translateY(100%)]",
          index === prevPrevIndex &&
            "pointer-events-none opacity-0 [transform:translateY(-110%)_rotateX(90deg)_translateY(-100%)]",
        )}
        target="_blank"
      >
        <Image
          className={cn(
            "max-w-[14.2rem] h-[8rem] sm:max-w-[16rem] sm:h-[9rem] md:max-w-[17.7rem] md:h-[10rem] lg:max-w-[21.3rem] lg:h-[12rem] object-contain px-3 py-5",
            index === prevIndex && "z-10",
            index === liveIndex && "z-50",
            index === nextIndex && "z-10 ",
            index === nextNextIndex && "z-0",
            index === prevPrevIndex && "z-0",
          )}
          src={podkrepqsht.logo}
          alt={podkrepqsht.name}
        />
      </Link>
    </li>
  );
}
