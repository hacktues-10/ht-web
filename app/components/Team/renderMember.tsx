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
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>
              {member.firstName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              {/* <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "} */}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

// import { CalendarDays } from "lucide-react"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card"

// export function HoverCardDemo() {
//   return (
//     <HoverCard>
//       <HoverCardTrigger asChild>
//         <Button variant="link">@nextjs</Button>
//       </HoverCardTrigger>
//       <HoverCardContent className="w-80">
//         <div className="flex justify-between space-x-4">
//           <Avatar>
//             <AvatarImage src="https://github.com/vercel.png" />
//             <AvatarFallback>VC</AvatarFallback>
//           </Avatar>
//           <div className="space-y-1">
//             <h4 className="text-sm font-semibold">@nextjs</h4>
//             <p className="text-sm">
//               The React Framework – created and maintained by @vercel.
//             </p>
//             <div className="flex items-center pt-2">
//               <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
//               <span className="text-xs text-muted-foreground">
//                 Joined December 2021
//               </span>
//             </div>
//           </div>
//         </div>
//       </HoverCardContent>
//     </HoverCard>
//   )
// }
