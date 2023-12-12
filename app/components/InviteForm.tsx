"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import invariant from "tiny-invariant";

import { Button } from "~/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import { cn } from "~/app/utils";
import {
  inviteToTeam,
  prepareParticipants,
} from "../(full-layout)/teams/actions";
import { toast } from "./ui/use-toast";

export function InviteForm({
  teamId,
  participants,
}: {
  teamId: string;
  participants: Awaited<ReturnType<typeof prepareParticipants>>;
}) {
  console.log(participants);
  async function handleSubmit() {
    console.log("inviteToTeam");
    const participantId = parseInt(value, 10);
    invariant(!isNaN(participantId), "Participant ID must be a number");
    const { success, error } = await inviteToTeam({
      invitedParticipantId: participantId,
      teamId,
    });

    console.log(success, error);
    if (!success) {
      throw new Error("Failed to invite participant to team :(");
    }
    if (success) {
      toast({
        title: "Поздравления!",
        description: "Поканата е изпратена успешно.",
      });
      setValue("");
      setOpen(false);
    }
  }

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="m-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? participants?.find((participant) => participant.value == value)
                  ?.label
              : "Избери участник"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Намери участник" />
            <CommandEmpty>Участникът не е намерен</CommandEmpty>
            <CommandGroup>
              {participants?.map((participant) => (
                <CommandItem
                  key={participant.value}
                  value={participant.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === participant.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {participant.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button className="ml-3" variant="outline" onClick={() => handleSubmit()}>
        Покани
      </Button>
    </div>
  );
}
