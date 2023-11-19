"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { getConfirmedTeams, getTeamById } from "~/app/teams/service";

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

  const router = useRouter();
  const [technologies, setTechnologies] = useState<string[]>([]);

  useEffect(() => {
    const technologiesArray =
      team.technologies?.split(", ").map((tech) => tech.trim()) || [];

    if (technologiesArray.length > 3) {
      const firstThreeTechnologies = technologiesArray.slice(0, 3);
      const remainingTechnologiesCount = technologiesArray.length - 3;
      const fourthTechnology = `+${remainingTechnologiesCount} more`;
      const modifiedTechnologiesArray = [
        ...firstThreeTechnologies,
        fourthTechnology,
      ];
      setTechnologies(modifiedTechnologiesArray);
    } else {
      setTechnologies(technologiesArray);
    }
  }, []);

  return (
    <div
      onClick={() => {
        router.push(`/teams/${team.id}`);
      }}
      key={team.id}
      className="z-10 m-5 h-max w-max rounded-md bg-gray-300 bg-opacity-20 bg-clip-padding p-5 shadow-[0_4px_12px_rgba(8,_112,_184,_0.7)] backdrop-blur-sm backdrop-filter hover:cursor-pointer"
    >
      <h2 className="w-max scroll-m-20 p-2 text-3xl font-semibold tracking-tight first:mt-0">
        {team.name}
      </h2>
      <p className="scroll-m-20 border-b border-gray-100/50 pl-2 leading-7 [&:not(:first-child)]:mt-2">
        {team.project?.name ?? "Все още няма проект"}
      </p>
      <div className="mt-2 inline-grid grid-cols-5 gap-5 border-b border-gray-100/50 p-2">
        {team.members.map((member) => (
          <div key={member.id}>
            <div
              className={`z-20 flex h-10 w-10 items-center justify-center rounded-full ${
                colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
              } text-center`}
            >
              <h1 className="p-2">
                {member.firstName?.charAt(0).toUpperCase()}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        {technologies && technologies.length > 0 ? (
          <div className="inline-grid grid-cols-4 gap-2 p-2">
            {technologies.map((technology, index) => (
              <p className="scroll-m-20 leading-7" key={index}>
                {technology}
              </p>
            ))}
          </div>
        ) : (
          <p className="scroll-m-20 leading-7">Няма технологии :(</p>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
