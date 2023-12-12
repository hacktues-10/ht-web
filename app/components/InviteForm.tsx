"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import invariant from "tiny-invariant";

import { Button } from "~/app/components/ui/button";
import {
  inviteToTeam,
  prepareParticipants,
} from "../(full-layout)/teams/actions";

export async function InviteForm({ teamId }: { teamId: string }) {
  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const participantIdField = data.get("participant-id");
  //   invariant(
  //     typeof participantIdField === "string",
  //     "Participant ID must be a string",
  //   );
  //   const participantId = parseInt(participantIdField, 10);
  //   invariant(!isNaN(participantId), "Participant ID must be a number");
  //   const { success } = await inviteToTeam({
  //     invitedParticipantId: participantId,
  //     teamId,
  //   });
  //   if (!success) {
  //     throw new Error("Failed to invite participant to team :(");
  //   }
  // }

  // return (
  //   <form className="flex flex-col space-y-4" onSubmit={() => {}}>
  //     <label htmlFor="participant-id">Participant ID</label>
  //     <input
  //       id="participant-id"
  //       name="participant-id"
  //       type="number"
  //       className="rounded-md border border-gray-300"
  //     />
  //     <button
  //       type="submit"
  //       className="bg-gradient-to-r from-pink-500 via-green-500 to-orange-900 bg-clip-text font-serif text-6xl font-extrabold italic text-transparent underline"
  //     >
  //       Покани
  //     </button>
  //   </form>
  // );

  const frameworks = await prepareParticipants();

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
