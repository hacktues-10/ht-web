"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

import "./animation.css";

import { useEffect, useState } from "react";

import { Button } from "~/app/components/ui/button";
import kiki from "../team/kiki.webp";

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
  const delay = 200;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisibleImg(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fadeInUp flip-card m-10 h-[560px] w-[350px] max-w-[350px] rounded-xl"
      style={{
        animationDelay: `${delay}ms`,
        opacity: isVisibleImg ? 1 : 0,
      }}
    >
      <div
        onClick={(e) => {
          if (window.matchMedia("(max-width: 768px)").matches) {
            const flipCard = e.currentTarget as HTMLElement;
            if (flipCard) {
              flipCard.style.transform == "rotateY(180deg)"
                ? (flipCard.style.transform = "rotateY(0deg)")
                : (flipCard.style.transform = "rotateY(180deg)");
            }
          }
        }}
        className="flip-card-inner  m-8 mx-auto rounded-xl  border-2 border-slate-900 bg-slate-900 text-center text-card-foreground shadow-sm hover:scale-105"
      >
        <div className="flip-card-front overflow-clip">
          <NameAndRole member={member} index={index} />
          <Image
            src={member.photo}
            alt={member.name}
            className={`sm:w-200 md:w-300 lg:w-400 my-auto rounded ${member.customClass}`}
          />
        </div>
        <div className="flip-card-back flex flex-col items-center justify-between bg-slate-900 p-5 pt-0">
          <div>
            <NameAndRole member={member} index={index} />
          </div>
          <p className="text-xl">{member.description}</p>
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="hover:scale-110"
          >
            <Link
              href={`https://www.instagram.com/${
                member.Instagram.startsWith("@")
                  ? member.Instagram.slice(1)
                  : member.Instagram
              }`}
            >
              <Instagram />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function NameAndRole({ member, index }: { member: Member; index: number }) {
  return (
    <>
      <p className="pt-2 font-sans text-2xl font-semibold leading-7">
        {member.name}
      </p>
      <p className="p-1 font-sans text-lg italic leading-7">{member.role}</p>
    </>
  );
}
