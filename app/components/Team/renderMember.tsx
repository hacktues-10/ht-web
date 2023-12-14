import { TbBrandDiscord } from "react-icons/tb";

import { TeamMember } from "~/app/(full-layout)/teams/service";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/app/components/ui/hover-card";
import Crown from "../Crown";

export default function RenderMember({
  member,
  color,
}: {
  member: TeamMember;
  color: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="transition-transform duration-300 ease-in-out hover:scale-105">
          {member.isCaptain && (
            <div className="ml-auto mr-auto h-4 w-8">
              <Crown />
            </div>
          )}
          <Avatar className="m-auto mt-0">
            <AvatarImage />
            <AvatarFallback className={`${color}`}>
              {member.firstName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="">
        <div className="flex justify-between space-x-4">
          <Avatar className="m-auto">
            <AvatarImage />
            <AvatarFallback className={`${color}`}>
              {member.firstName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-md font-semibold">
              {`${member.firstName} ${member.lastName}`}
            </h4>
            <div className="flex items-center">
              <p className="text-xs italic">
                {member.isCaptain ? "Капитан" : "Участник"}
              </p>
              <p className="ml-2 text-xs opacity-70">
                {member.parallel
                  ? `${member.grade} ${member.parallel}`
                  : `Випуск ${member.grade}`}
              </p>
            </div>
            {member.discordUser ? (
              <div className="flex items-center pt-2">
                <TbBrandDiscord size={32} />
                <span className="m-3 text-xs text-muted-foreground">
                  member.discordUser.discordUsername
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
