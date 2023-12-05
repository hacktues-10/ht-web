import { CgInfo } from "react-icons/cg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import { getTeamById } from "../teams/service";

export default async function TeamDetailsComponent({
  team,
}: {
  team: Exclude<Awaited<ReturnType<typeof getTeamById>>, null>;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className="mr-0 mt-8 text-4xl hover:cursor-pointer sm:text-5xl"
        asChild
      >
        <CgInfo />
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-3xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{team.name}</DialogTitle>
          <DialogDescription className="text-center">
            {team.description ?? "Този отбор няма описание"}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
