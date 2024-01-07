'use client'
import { isParticipantStudent } from "~/app/participants/service";
import { Command, CommandGroup, CommandItem, CommandEmpty,CommandInput } from "~/app/components/ui/command";
import {Popover, PopoverTrigger, PopoverContent} from "~/app/components/ui/popover";
import {Button} from "~/app/components/ui/button";
import {useState, useEffect } from "react";
export default function DisqualifyParticipant(participants: Array<object>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] =useState("");
  participants.map((participant) => (
    {...participant, label: formatNick(participant), value:  }
  ))
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
      <Button className="ml-3" variant="outline" onClick={() => console.log()}>
        Покани
      </Button>
    </div>;
}

const formatNick = (user: any) => {
  if (isParticipantStudent(user)) {
    return `${user.firstName} ${user.lastName} (${user.grade}${user.parallel})`;
  } else {
    return `${user.firstName} ${user.lastName} (ТУЕС'${user.grade})`;
  }
};