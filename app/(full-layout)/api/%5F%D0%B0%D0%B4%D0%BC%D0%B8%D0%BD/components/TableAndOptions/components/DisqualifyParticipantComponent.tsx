"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { ScrollArea } from "~/app/components/ui/scroll-area";
import { useToast } from "~/app/components/ui/use-toast";
import { disqualifyParticipantByIdClient } from "~/app/participants/actions";
import { cn } from "~/app/utils";

export default function DisqualifyParticipantComponent({
  participants,
}: {
  participants: any;
}) {
  const { toast } = useToast();
  const handleClick = async () => {
    const response = await disqualifyParticipantByIdClient(value, participants);

    if (response.success) {
      toast({
        title: "Участникът е дисквалифициран",
        variant: "destructive",
      });
    } else {
      toast({
        title: "OПА",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="m-2 rounded-xl border-2 border-red-600">
      <h3 className="m-5 mb-0 font-semibold">Дисквалифицирай ученик</h3>
      <div className="m-5 mt-1 flex w-96">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-96 justify-between overflow-hidden"
            >
              {value
                ? participants?.find(
                    (participant: any) => participant.value == value,
                  )?.label
                : "Избери участник"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" overflow-hidden p-0">
            <Command className="max-w-64 w-64 ">
              <CommandInput placeholder="Намери участник" />
              <CommandEmpty>Участникът не е намерен</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-64 max-h-96">
                  {participants?.map((participant: any) => (
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
          variant="destructive"
          onClick={() => handleClick()}
        >
          Дисквалифицирай
        </Button>
      </div>
    </div>
  );
}
