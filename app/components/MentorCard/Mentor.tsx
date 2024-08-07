import React from "react";
import Image from "next/image";
import Link from "next/link";

import { getAllMentors } from "~/app/(full-layout)/mentors/service";
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

interface MentorInterface {
  mentor: Awaited<ReturnType<typeof getAllMentors>>[number];
}

const Mentor: React.FC<MentorInterface> = async ({ mentor }) => {
  const techn = convertToTechnology(mentor.technologies ?? "");

  return (
    <TooltipProvider>
      <Tooltip>
        <Card className="w-[290px] overflow-hidden border-2 border-gray-400 duration-500 hover:scale-105 hover:cursor-pointer hover:border-sand sm:w-[360px]">
          <Dialog>
            <TooltipTrigger asChild>
              <DialogTrigger>
                <div className="mt-4 h-[280px] max-h-[280px] w-full overflow-hidden rounded-xl sm:h-[300px] sm:max-h-[300px]">
                  <Image
                    src={`/mentors/${mentor.fileName}`}
                    className="mx-auto overflow-hidden rounded-xl sm:hidden"
                    alt={mentor.name}
                    width={260}
                    height={260}
                  />
                  <Image
                    src={`/mentors/${mentor.fileName}`}
                    className="mx-[30px] hidden overflow-hidden rounded-xl sm:block"
                    alt={mentor.name}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="h-min px-6 pt-2 text-left text-xl font-semibold sm:pt-6 sm:text-2xl">
                  <h2>{mentor.name}</h2>
                </div>
                <CardHeader className="pt-0 text-left text-xl font-semibold sm:text-2xl">
                  <ScrollArea className="h-[100px] overflow-ellipsis">
                    {mentor.tuesVispusk && mentor.tuesVispusk != "-" && (
                      <CardDescription className="text-xs">
                        Випуск {mentor.tuesVispusk}
                      </CardDescription>
                    )}

                    {mentor.companyName != "Общността" &&
                    mentor.companyName &&
                    mentor.companyName.trim() != "-" ? (
                      <CardDescription className="text-xs sm:text-sm">
                        {mentor.companyName} -{" "}
                        <span className="italic">{mentor.jobPosition}</span>
                      </CardDescription>
                    ) : (
                      mentor.jobPosition &&
                      mentor.jobPosition != "-" && (
                        <CardDescription className="text-xs sm:text-sm">
                          <span className="italic">{mentor.jobPosition}</span>
                        </CardDescription>
                      )
                    )}

                    {mentor.companyName == "Общността" && (
                      <CardDescription className="text-xs sm:text-sm">
                        <span className="italic">{mentor.jobPosition}</span>
                      </CardDescription>
                    )}

                    <CardDescription className="">
                      {mentor.description}
                    </CardDescription>
                  </ScrollArea>
                </CardHeader>
                <CardFooter>
                  <ScrollArea className={cn("h-[70px] w-full flex-auto gap-2")}>
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
                </CardFooter>
              </DialogTrigger>
            </TooltipTrigger>

            <DialogContent className="w-2/3 rounded-xl text-left">
              <DialogHeader className="text-left">
                <DialogTitle>{mentor.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Ще може да ви помогне{" "}
                  {mentor.where == "И двете"
                    ? "на живо и онлайн"
                    : mentor.where?.toLowerCase()}{" "}
                  на:
                </p>
                {mentor.schedule?.split(", ").map((info: any) => {
                  return info.trim() != "" && <span key={info}>• {info}</span>;
                })}
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <CardFooter className=" ">
            <Button asChild className="w-full text-black">
              <Link href={`/teams/${mentor.team.id}`}>{mentor.team.name}</Link>
            </Button>
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
