import { TbBrandDiscord } from "react-icons/tb";

import { getUserDiscordName } from "~/app/api/discord/actions";
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
import { particpants } from "~/app/db/schema";
import Crown from "../Crown";

type memberType = typeof particpants.$inferSelect;

export default async function RenderMember({
  member,
  color,
}: {
  member: memberType;
  color: string;
}) {
  const discordName = await getUserDiscordName(member.id);
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
            <div className="flex items-center pt-2">
              <TbBrandDiscord size={32} />
              <span className="m-3 text-xs text-muted-foreground">
                {discordName ? discordName : "??"}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
