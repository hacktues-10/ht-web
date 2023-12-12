import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/app/components/ui/hover-card";
import { particpants } from "~/app/db/schema";

type memberType = typeof particpants.$inferSelect;

export default function RenderMember({
  member,
  color,
}: {
  member: memberType;
  color: string;
}) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          className={`z-20 flex h-10 w-10 items-center justify-center rounded-full ${color} text-center`}
        >
          <h1 className="p-2">{member.firstName?.charAt(0).toUpperCase()}</h1>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  );
}
