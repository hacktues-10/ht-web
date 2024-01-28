"use client";

import Link from "next/link";

import "./animations.css";

import { useEffect, useState } from "react";

import { Team } from "~/app/(full-layout)/teams/service";
import { Badge } from "~/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { convertToPaginatedTechnologies } from "~/app/technologies";
import RenderMember, { PublicTeamMember } from "./renderMember";

interface TeamCardProps {
  team: Pick<Team, "id" | "technologies" | "name"> & {
    members: PublicTeamMember[];
    project: Pick<Team["project"], "name"> | null;
  };
  index: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, index }) => {
  const colors = [
    "bg-red-700",
    "bg-green-700",
    "bg-orange-700",
    "bg-yellow-700",
    "bg-emerald-700",
    "bg-cyan-700",
    "bg-sky-700",
    "bg-indigo-700",
    "bg-violet-700",
    "bg-purple-700",
  ];

  const [isVisible, setIsVisible] = useState(false);
  // const delay = index * 100;

  const delay = 1 * 100;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const techn = convertToPaginatedTechnologies(team.technologies || "", 3);
  return (
    <Link href={`/teams/${team.id}`}>
      <div
        className="fadeInComponent"
        style={{
          animationDelay: `${delay}ms`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <Card className="m-5 h-max max-w-[455px] overflow-ellipsis rounded-3xl backdrop-blur-sm backdrop-filter transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer">
          <CardHeader className="overflow-ellipsis pb-0">
            <CardTitle className="text-3xl">{team.name}</CardTitle>
            <CardDescription className="scroll-m-20 border-b border-gray-100/50 pl-2 leading-7 [&:not(:first-child)]:mt-2">
              {team.project?.name ? team.project?.name : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="m-6 mb-0 mt-0 border-b border-gray-100/50 p-0">
            <div className="mt-2 inline-grid grid-cols-5 gap-5 overflow-ellipsis p-2">
              {team.members.map((member) => (
                <RenderMember
                  color={colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]}
                  member={member}
                  key={member.id}
                />
              ))}
            </div>
          </CardContent>
          <CardFooter className="pb-2">
            {techn && techn.length > 0 ? (
              <div className="flex w-full gap-2 overflow-hidden p-2 [mask-image:linear-gradient(to_right,white,90%,transparent)] xl:[mask-image:none]">
                {techn.map((technology, index) => (
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: technology?.color,
                      color: technology?.textColor,
                    }}
                    className="mt-2 whitespace-nowrap text-xs transition-transform duration-300 ease-in-out hover:scale-105"
                    key={index}
                  >
                    {technology?.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="pb-2 pt-2">
                <Badge className="scroll-m-20 leading-7">
                  Няма технологии :(
                </Badge>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </Link>
  );
};

export default TeamCard;
