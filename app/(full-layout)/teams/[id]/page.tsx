import Link from "next/link";
import { notFound } from "next/navigation";
import { TbBrandGithub } from "react-icons/tb";

import "~/app/components/Team/animations.css";

import { PropsWithChildren } from "react";
import { LuGlobe } from "react-icons/lu";

import { getMentorById } from "~/app/(full-layout)/mentors/service";
import TeamDetailsComponent from "~/app/components/teamDetailsComponent";
import TeamMemberDetailedView from "~/app/components/teamMemberDetailedView";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import { Badge } from "~/app/components/ui/badge";
import { Button } from "~/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import { ScrollArea, ScrollBar } from "~/app/components/ui/scroll-area";
import { Tabs, TabsContent } from "~/app/components/ui/tabs";
import { convertToTechnology } from "~/app/technologies";
import { cn } from "~/app/utils";
import { getProjectByTeamId, getTeamById, getTeamMembers } from "../service";

type TeamDetailPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: TeamDetailPageProps) {
  const team = await getTeamById(params.id);
  if (!team) {
    notFound();
  }
  return {
    title: team.name,
    description: team.description,
    openGraph: {
      title: team.name,
      description: team.description,
    },
  };
}
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

export default async function TeamDetailPage({
  params: { id },
}: TeamDetailPageProps) {
  const loadedTeam = await getTeamById(id);
  if (!loadedTeam) {
    notFound();
  }

  const team = {
    id: loadedTeam.id,
    name: loadedTeam.name,
    technologies: loadedTeam.technologies,
    description: loadedTeam.description,
    mentorId: loadedTeam.mentorId,
    isAlumni: loadedTeam.isAlumni,
    semiFinal: loadedTeam.semiFinal,
  };

  const techn = convertToTechnology(team.technologies || "");
  const mentor = team.mentorId ? await getMentorById(team.mentorId) : null;

  const teamMembers = await getTeamMembers(team.id);

  const project = await getProjectByTeamId(team.id);
  return (
    <div className="h-full w-full max-w-6xl justify-center text-center ">
      <Card className="fadeIn h-min w-full rounded-3xl border-2 p-5 pt-0 sm:p-10 sm:pt-5">
        <div className="flex w-full">
          <div className="flex items-center">
            <Button
              asChild
              variant="secondary"
              className="mt-8 backdrop-blur-md"
            >
              <Link href="/teams">
                {"<- "}
                Назад
              </Link>
            </Button>
          </div>

          <div className="ml-auto mr-0">
            <TeamDetailsComponent team={team} />
          </div>
        </div>
        <div className="mt-2 flex flex-grow items-center justify-center overflow-hidden pt-3 sm:mt-1">
          <h1 className="ml-auto mr-auto mt-0 flex  text-4xl font-semibold text-white sm:text-5xl">
            {team.name}
          </h1>
        </div>
        <div className="z-10 mt-4 flex w-full flex-wrap items-center justify-center sm:mb-4 sm:mt-10">
          {teamMembers.map((member: any) => (
            <TeamMemberDetailedView
              member={{
                id: member.id,
                firstName: member.firstName,
                lastName: member.lastName,
                isCaptain: member.isCaptain,
              }}
              key={member.id}
            />
          ))}
        </div>
      </Card>
      <div className="w-full justify-between sm:shrink-0 md:flex">
        <Card className="fadeInComponent m-10 ml-auto mr-auto h-full w-full rounded-3xl border-2 p-3 sm:m-10 sm:ml-0">
          <Tabs defaultValue="information">
            <div className="ml-1 mr-1 mt-0 rounded-3xl border-2 px-5 pb-5 pt-2 text-left sm:m-auto">
              <TabsContent value="information">
                {project && (
                  <div>
                    <h2 className="w-full text-3xl font-bold">
                      {project.name}
                    </h2>
                    <div className="pt-2" />
                    {project.description
                      .split("\n")
                      .map((line: any, index: any) => (
                        <p key={index} className="mt-4 text-muted-foreground">
                          {line}
                        </p>
                      ))}

                    <div className="pt-5" />

                    <ReposCard project={project} />

                    <DemoCard url={project.websiteUrl} />
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </Card>
        <div className="w-full md:max-w-sm">
          <Card className="fadeInComponent m-10 ml-auto mr-auto h-min rounded-3xl border-2 p-5 sm:mr-0">
            {teamMembers.length > 0 &&
              teamMembers.map((member: any) => (
                <div
                  key={member.id}
                  className="m-2 flex rounded-2xl border-2 p-2"
                >
                  <div
                    className={`z-30 mb-auto mt-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      colors[(member.firstName?.charCodeAt(0) ?? 0) % 10]
                    } text-center`}
                  >
                    <h1 className="p-2 text-sm">
                      {member.firstName?.charAt(0).toUpperCase()}
                    </h1>
                  </div>
                  <h2 className="m-auto ml-4 text-left text-lg">
                    {member.firstName.slice(0, 21)}{" "}
                    {member.lastName.slice(0, 21)}
                  </h2>
                </div>
              ))}
            {!team.isAlumni &&
              (team.mentorId && mentor && mentor.id && mentor.fileName ? (
                <div className="mt-4 rounded-xl border-2 py-2">
                  <h2 className="m-auto ml-4 text-left text-xl">Ментор</h2>
                  <div
                    key={mentor?.id}
                    className="m-2 flex rounded-2xl border-2 p-2"
                  >
                    <div>
                      <Avatar>
                        <AvatarImage
                          src={`/mentors/${mentor?.fileName}`}
                          alt={mentor?.name}
                        ></AvatarImage>
                        <AvatarFallback>?</AvatarFallback>
                      </Avatar>
                    </div>
                    <h2 className="m-auto ml-4 text-left text-lg">
                      {mentor?.name}
                    </h2>
                  </div>
                </div>
              ) : (
                <div
                  key={mentor?.id}
                  className="m-2 flex rounded-2xl border-2 p-2"
                >
                  <div>
                    <Avatar>
                      <AvatarImage></AvatarImage>
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  </div>
                  <h2 className="m-auto ml-4 text-left text-lg">
                    Все още няма ментор
                  </h2>
                </div>
              ))}
          </Card>

          <Card className="fadeInComponent m-10 ml-auto mr-auto overflow-hidden rounded-3xl border-2 p-5 sm:mr-0">
            <h3 className="mb-2 text-2xl">Технологии</h3>
            {techn && techn.length > 0 ? (
              <ScrollArea
                className={cn(
                  "m-2 h-min w-full flex-auto gap-2 p-2",
                  techn.length > 10 && "h-[210px]",
                )}
              >
                {techn.map((technology, index) => (
                  <Badge
                    variant="outline"
                    style={{
                      backgroundColor: technology?.color,
                      color: technology?.textColor,
                    }}
                    className="m-1 whitespace-nowrap text-base"
                    key={index}
                  >
                    {technology?.name}
                  </Badge>
                ))}
              </ScrollArea>
            ) : (
              <Badge className="m-2 scroll-m-20 leading-7">
                Няма технологии :(
              </Badge>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function ReposCard({
  project,
}: {
  project: {
    teamId: string;
    fallbackRepoUrls: string;
    githubRepos: any[];
  };
}) {
  const fallbackRepos = project.fallbackRepoUrls
    .split("\n")
    .filter((url) => !!url.trim())
    .map((url) => ({ url, display: url }));
  const githubRepos = project.githubRepos
    // .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    .map((repo) => ({
      url: repo.url,
      display: repo.url,
    }));
  const repos = [...githubRepos, ...fallbackRepos];
  return (
    <Card className="mt-4 border-2">
      <CardHeader className="px-5 pb-0 pt-5">
        <CardTitle>Код на проекта</CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-3">
        {repos.length > 0 ? (
          <div className="py-2">
            {repos.map((repo, index) => (
              <ProjectLink key={index} href={repo.url}>
                {repo.display}
              </ProjectLink>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Няма добавени GitHub хранилища
          </p>
        )}
      </CardContent>
    </Card>
  );
}
function DemoCard({ url }: { url: string | null }) {
  if (!url) {
    return null;
  }
  return (
    <Card className="mt-4 border-2">
      <CardHeader className="px-5 pb-0 pt-5">
        <CardTitle>Демо на проекта</CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-6">
        <ProjectLink href={url ?? ""} icon={LuGlobe}>
          {url}
        </ProjectLink>
      </CardContent>
    </Card>
  );
}

function ProjectLink({
  href,
  children,
  icon: Icon = TbBrandGithub,
}: PropsWithChildren<{ href: string; icon?: React.FC<{ size: number }> }>) {
  return (
    <Link className="mt-2 flex" href={href} target="_blank">
      <Icon size={26} />
      <ScrollArea className="w-full">
        <span className="ml-2 w-max text-lg">{children}</span>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Link>
  );
}
