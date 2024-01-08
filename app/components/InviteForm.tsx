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
import { getParticipantIdByValue } from "../participants/actions";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "./ui/use-toast";

export function InviteForm({
  teamId,
  participants,
}: {
  teamId: string;
  participants: Awaited<ReturnType<typeof prepareParticipants>>;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleSubmit() {
    const participantId = getParticipantIdByValue(value, participants);

    if (isNaN(participantId)) {
      toast({
        title: "Моля изберете участник, който да поканите.",
      });
      return;
    }

    setIsLoading(true);

    const { success, error } = await inviteToTeam({
      invitedParticipantId: participantId,
      teamId,
    });

    if (error === "Този участник вече е поканен.") {
      toast({
        title: "Вече сте поканили този участник",
        description: "",
      });
    } else if (!success) {
      //TODO: Maybe not use an if statement
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
    setIsLoading(false);
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
            className="w-[200px] justify-between overflow-clip"
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
              <ScrollArea className="h-[240px]">
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
                        value === participant.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {participant.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="ml-3"
        variant="outline"
        disabled={isLoading}
        onClick={() => handleSubmit()}
      >
        Покани
      </Button>
    </div>
  );
}
