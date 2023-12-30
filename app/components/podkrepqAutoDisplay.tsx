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
  const perviousIndex =
    liveIndex === 0 ? podkrepqshti.length - 1 : liveIndex - 1;
  const perPerviousIndex =
    perviousIndex === 0 ? podkrepqshti.length - 1 : perviousIndex - 1;
  const nextNextIndex = nextIndex < podkrepqshti.length - 1 ? nextIndex + 1 : 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveIndex((prevIndex) =>
        prevIndex === podkrepqshti.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-wrap align-middle">
      <ul className="relative mx-auto mt-20 w-64 sm:w-72 md:w-80 lg:w-96">
        <div className="pb-[50%] pt-[20%] ">
          {podkrepqshti.map((podkrepqsht, index) => (
            <li
              key={podkrepqsht.name}
              className="absolute inset-0 my-4 [perspective:800px] "
              title={podkrepqsht.name}
            >
              <Link
                href={podkrepqsht.url}
                className={cn(
                  "group z-0 grid aspect-video place-content-center overflow-clip rounded-lg bg-white p-4 opacity-0 shadow-md transition-all duration-700",
                  index === perviousIndex &&
                    "z-10 opacity-50 [transform:rotateX(45deg)_translateY(-130%)]",
                  index === liveIndex && "z-50 opacity-100",
                  index === nextIndex &&
                    "z-10 opacity-50 [transform:rotateX(-45deg)_translateY(130%)]",
                  index === nextNextIndex &&
                    "opacity-0 [transform:rotateX(-90deg)_translateY(160%)]",
                  index === perPerviousIndex &&
                    "opacity-0 [transform:rotateX(90deg)_translateY(-160%)]",
                )}
                target="_blank"
              >
                <Image
                  className={cn(
                    "max-h-full max-w-full object-contain px-3 py-5",
                    index === perviousIndex && "z-10",
                    index === liveIndex && "z-50",
                    index === nextIndex && "z-10 ",
                    index === nextNextIndex && "z-0",
                    index === perPerviousIndex && "z-0",
                  )}
                  src={podkrepqsht.logo}
                  alt={podkrepqsht.name}
                />
              </Link>
            </li>
          ))}
        </div>
      </ul>
      <div className="ml-10 hidden md:mt-10 md:block md:w-[400px] lg:mt-20 lg:w-[600px]">
        <Card className="w-full p-2">
          <CardTitle className="pt-5 text-center text-white">
            {podkrepqshti[liveIndex].name}
          </CardTitle>
          <CardContent className="p-5 text-white">
            <div className="max-h-[200px] overflow-y-scroll ">
              <p>
                {podkrepqshti[liveIndex].description?.substring(0, 270)}
                ...&emsp;
                <Link
                  className="font-semibold italic text-white"
                  href={podkrepqshti[liveIndex].url}
                >
                  Научи повече
                </Link>
              </p>
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
