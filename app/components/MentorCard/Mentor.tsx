import React from "react";
import Image from "next/image";

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { getAllMentors } from "~/app/(full-layout)/mentors/service";
import { getTeamById } from "~/app/(full-layout)/teams/service";
import { getParticipantFromSession } from "~/app/participants/service";
import { convertToTechnology } from "~/app/technologies";
import { cn } from "~/app/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import ChooseMentor from "./ChooseMentor";

interface MentorInterface {
  mentor: Awaited<ReturnType<typeof getAllMentors>>[number];
  participant: Awaited<ReturnType<typeof getParticipantFromSession> | null>;
  participantTeam: Awaited<ReturnType<typeof getTeamById> | null>;
  isMentorTaken: boolean;
}

const Mentor: React.FC<MentorInterface> = async ({
  mentor,
  participant,
  participantTeam,
  isMentorTaken,
}) => {
  const techn = convertToTechnology(mentor.technologies ?? "");
  return (
    <TooltipProvider>
      <Tooltip>
        <Card className="w-[300px] border-2 border-sand duration-500 hover:scale-105 hover:cursor-pointer">
          <Dialog>
            <TooltipTrigger asChild>
              <DialogTrigger>
                <div className="m-2">
                  <img
                    src={`/mentors/${mentor.fileName}`}
                    className="rounded-xl"
                    alt={mentor.name}
                  />
                </div>
                <CardHeader className="text-left text-xl font-semibold sm:text-2xl">
                  <h2>{mentor.name}</h2>
                  {mentor.tuesVispusk && (
                    <CardDescription className="text-xs">
                      Випуск {mentor.tuesVispusk}
                    </CardDescription>
                  )}

                  {mentor.companyName != "Общността" && (
                    <CardDescription className="text-xs sm:text-sm">
                      {mentor.companyName} -{" "}
                      <span className="italic">{mentor.jobPosition}</span>
                    </CardDescription>
                  )}
                  {mentor.companyName == "Общността" && (
                    <CardDescription className="text-xs sm:text-sm">
                      <span className="italic">{mentor.jobPosition}</span>
                    </CardDescription>
                  )}
                  <ScrollArea className="h-[100px]">
                    <CardDescription className="">
                      {mentor.description}
                    </CardDescription>
                  </ScrollArea>
                </CardHeader>
                <CardFooter>
                  {techn && techn.length > 0 && (
                    <ScrollArea
                      className={cn(
                        "h-min w-full flex-auto gap-2",
                        techn.length > 5 && "h-[70px]",
                      )}
                    >
                      {techn.map((technology, index) => (
                        <Badge
                          variant="outline"
                          style={{
                            backgroundColor: technology?.color,
                            color: technology?.textColor,
                          }}
                          className="m-1 whitespace-nowrap text-sm"
                          key={index}
                        >
                          {technology?.name}
                        </Badge>
                      ))}
                    </ScrollArea>
                  )}
                </CardFooter>
              </DialogTrigger>
            </TooltipTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>{mentor.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{mentor.where}</p>
                <p className="text-sm text-muted-foreground">
                  Ще може да ви помогне на:
                </p>
                {mentor.schedule
                  ?.split(", ")
                  .map((info) => <span key={info}>• {info}</span>)}
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <CardFooter>
            <IfHTFeatureOn feature="choose-mentor">
              {participant &&
                participant.team.isCaptain == true &&
                participantTeam?.id &&
                participantTeam?.mentorId == null &&
                !isMentorTaken && (
                  <ChooseMentor
                    mentorId={mentor.id}
                    teamId={participantTeam?.id}
                  />
                )}
              {isMentorTaken && (
                <Button disabled={true} className="w-full text-black">
                  {mentor.team?.name}
                </Button>
              )}
            </IfHTFeatureOn>
          </CardFooter>
        </Card>
        <TooltipContent>
          <p>Цъкни ме</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Mentor;
