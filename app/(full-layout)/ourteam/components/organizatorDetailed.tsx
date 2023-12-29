"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card } from "~/app/components/ui/card";
import kiki from "../team/kiki.webp";

import "./animations.css";

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
    <Card
      className="fadeIn z-2 m-8 mx-auto w-[350px] rounded-xl  border-2 transition-transform duration-300 ease-in-out hover:scale-105 sm:flex sm:h-[440px] md:w-[700px] lg:w-[960px]"
      style={{
        animationDelay: `${delay}ms`,
        opacity: isVisibleImg ? 1 : 0,
      }}
    >
      <Image
        src={member.photo}
        alt={member.name}
        className={`sm:w-200 md:w-300 lg:w-400 m-auto rounded ${member.customClass}`}
      />
      <div className="mb-4 mt-2 w-full">
        <p className="pt-2 font-sans text-xl font-semibold leading-7">
          {member.name}
        </p>
        <p className="p-1 font-sans italic leading-7">{member.role}</p>
        <Link
          href={`https://www.instagram.com/${
            member.Instagram.startsWith("@")
              ? member.Instagram.slice(1)
              : member.Instagram
          }`}
          className="w-full hover:underline"
        >
          {member.Instagram}
        </Link>
        <p
          className={`fadeIn } m-5 p-1 font-sans leading-7 text-opacity-0 transition-transform duration-300
          ease-in-out`}
        >
          {member.description}
        </p>
      </div>
    </Card>
  );
}
