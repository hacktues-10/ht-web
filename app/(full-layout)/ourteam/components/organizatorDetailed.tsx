"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/app/components/ui/button";
import { Card } from "~/app/components/ui/card";
import kiki from "../team/kiki.webp";

import "./animations.css";

import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Instagram } from "lucide-react";

import { HoverCard, HoverCardContent } from "~/app/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/app/components/ui/tooltip";

interface Member {
  name: string;
  Instagram: string;
  photo: typeof kiki;
  role: string;
  description: string;
  customClass: string;
}

export default function OrganizatorDetailed({
  member,
  index,
}: {
  member: Member;
  index: number;
}) {
  const [isVisibleImg, setIsVisibleImg] = useState(false);
  const delay = index * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibleImg(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-[560px]  w-[350px]  hover:[transform:rotateY(180deg)]">
      <Card
        className="fadeIn z-2 [transition:0.8s_transform-style:preserve-3d] relative m-8
          mx-auto h-[100%] w-[100%] rounded-xl border-2 text-center [transform:rotateY(180deg)]  hover:scale-105"
      >
        <div
          id="front"
          className="absolute h-full w-full [-webkit-backface-visibility:hidden_backface-visibilityhidden]"
        >
          <p className="pt-2 font-sans text-xl font-semibold leading-7">
            {member.name}
          </p>
          <p className="p-1 font-sans text-lg italic leading-7">
            {member.role}
          </p>
          <div className="flex items-center">
            <Image
              src={member.photo}
              alt={member.name}
              className={`sm:w-200 md:w-300 lg:w-400 my-auto rounded ${member.customClass}`}
            />
          </div>
        </div>
        <div
          id="back"
          className="absolute h-full w-full [transform:rotateY(180deg)] [-webkit-backface-visibility:hidden_backface-visibilityhidden]"
        >
          <p>{member.description}</p>
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="transition-transform hover:scale-110"
          >
            <Link
              href={`https://www.instagram.com/${
                member.Instagram.startsWith("@")
                  ? member.Instagram.slice(1)
                  : member.Instagram
              }`}
              target="_blank"
              className="hover:scale-110"
            >
              <Instagram />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
