"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getConfirmedTeams,
  getTeamById,
} from "~/app/(full-layout)/teams/service";
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
import RenderMember from "./renderMember";

interface TeamCardProps {
  team: Exclude<Awaited<ReturnType<typeof getConfirmedTeams>>[number], null>;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
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

  const techn = convertToPaginatedTechnologies(team.technologies || "", 3);

  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="z-10 m-5 h-max rounded-md bg-gray-300 bg-opacity-20 bg-clip-padding shadow-[0_4px_12px_rgba(8,_112,_184,_0.7)] backdrop-blur-sm backdrop-filter hover:cursor-pointer">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl">{team.name}</CardTitle>
          <CardDescription className="scroll-m-20 border-b border-gray-100/50 pl-2 leading-7 [&:not(:first-child)]:mt-2">
            {team.project?.name ?? "Все още няма проект"}
          </CardDescription>
        </CardHeader>
        <CardContent className="m-6 mb-0 mt-0 border-b border-gray-100/50 p-0">
          <div className="mt-2 inline-grid grid-cols-5 gap-5 p-2">
            {team.members.map((member) => (
              <div key={member.id}>
                <RenderMember
                  color={colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]}
                  member={member}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          {techn && techn.length > 0 ? (
            <div className="flex w-full gap-2 overflow-hidden p-2">
              {techn.map((technology, index) => (
                <Badge
                  variant="outline"
                  style={{
                    backgroundColor: technology?.color,
                    color: technology?.textColor,
                  }}
                  className="whitespace-nowrap text-xs"
                  key={index}
                >
                  {technology?.name}
                </Badge>
              ))}
            </div>
          ) : (
            <Badge className="scroll-m-20 leading-7">Няма технологии :(</Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TeamCard;
