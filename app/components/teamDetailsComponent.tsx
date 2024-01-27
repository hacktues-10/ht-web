import { CgInfo } from "react-icons/cg";

import { Team } from "~/app/(full-layout)/teams/service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import { Button } from "./ui/button";

function longWordInDescription(description: string) {
  return description.split(" ").filter((word) => word.length > 40);
}

export default async function TeamDetailsComponent({
  team,
}: {
  team: Pick<Team, "name" | "description">;
}) {
  return (
    <Dialog>
      <DialogTrigger className="mr-0 mt-8 hover:cursor-pointer" asChild>
        <Button size={"icon"} className="text-2xl" variant={"ghost"}>
          <CgInfo />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-3xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{team.name}</DialogTitle>
          <DialogDescription className="text-center">
            {team.description
              ? longWordInDescription(team.description).length > 0
                ? `${team.description.slice(0, 40)}`
                : `${team.description}`
              : "Този отбор няма описание"}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
