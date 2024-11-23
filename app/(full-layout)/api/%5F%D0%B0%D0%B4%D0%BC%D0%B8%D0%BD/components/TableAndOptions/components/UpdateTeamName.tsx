import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { renameTeam } from "~/app/(full-layout)/teams/actions";
import { Button } from "~/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/app/components/ui/command";
import { Input } from "~/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import { ScrollArea } from "~/app/components/ui/scroll-area";
import { useToast } from "~/app/components/ui/use-toast";
import { cn } from "~/app/utils";

export default function UpdateTeamName({
  data,
}: {
  data: (
    | {
        label: string;
        value: string;
        id: string;
        name: string;
        description: string;
        mentor: string;
        members: number;
        semiFinal: string;
        isFinalist: string;
        final: string;
      }
    | undefined
  )[];
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const [newName, setNewName] = useState("");

  async function handleClick() {
    const rename = await renameTeam({
      teamId: value,
      name: newName,
    });

    toast({
      variant: rename?.success ? "default" : "destructive",
      title: rename?.message,
    });
  }

  return (
    <div className="m-2  w-1/2 rounded-xl border-2 border-red-600">
      <h3 className="m-5 mb-0 font-semibold">Преименувай отбор</h3>
      <div className="m-5 mt-1 flex ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-96" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-96 justify-between overflow-hidden"
            >
              {value
                ? data?.find((team: any) => team.value == value)?.label
                : "Избери отбор"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" overflow-hidden p-0">
            <Command className="max-w-64 w-64 ">
              <CommandInput placeholder="Намери отбор" />
              <CommandEmpty>Отборът не е намерен</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-64 max-h-96">
                  {data?.map((participant: any) => (
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
        <Input
          className="ml-2 w-96"
          placeholder="Въведи новото име на отбора"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button
          className="ml-3"
          variant="destructive"
          onClick={() => handleClick()}
        >
          Преименувай
        </Button>
      </div>
    </div>
  );
}
