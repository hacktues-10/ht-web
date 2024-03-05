import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { deleteTeamAdmin, renameTeam } from "~/app/(full-layout)/teams/actions";
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

export default function SemiFinalResultsTeams({
  data,
}: {
  data: (
    | {
        label: string;
        value: string;
        id: string;
        name: string;
        isAlumni: string;
        semiFinal: number | null;
        semiFinalResult: string;
        isFinalist: string;
        final: string;
      }
    | undefined
  )[];
}) {
  const semifinals = [
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    },
    {
      label: "7",
      value: "7",
    },
    {
      label: "8",
      value: "8",
    },

    {
      label: "9",
      value: "9",
    },
    {
      label: "10",
      value: "10",
    },
  ];
  const [openТеаm, setOpenTeam] = useState(false);
  const [openSemiFinal, setOpenSemiFinal] = useState(false);

  const [selectedTeam, setTeam] = useState("");
  const [semiFinal, setSemiFinal] = useState("");
  const [semiFinalResult, setSemiFinalResult] = useState("");
  const { toast } = useToast();
  async function handleClick() {
    // const res = await addTeamResult(value, semiFinal, semiFinalResult);
    // toast({
    //   variant: res?.success ? "sand" : "destructive",
    //   title: res?.message,
    // });
    console.log(selectedTeam, semiFinal, semiFinalResult);
  }

  return (
    <div className="m-2  w-1/2 rounded-xl border-2 border-white">
      <h3 className="m-5 mb-0 font-semibold">Добави резултати за полуфинал</h3>
      <div className="m-5 mt-1 flex ">
        <Popover open={openТеаm} onOpenChange={setOpenTeam}>
          <PopoverTrigger className="w-96" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={true}
              className="w-96 justify-between overflow-hidden"
            >
              {selectedTeam
                ? data?.find((team: any) => team.value == selectedTeam)?.label
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
                  {data?.map((team: any) => (
                    <CommandItem
                      key={team.value}
                      value={team.value}
                      onSelect={(currentValue) => {
                        setTeam(currentValue === team ? "" : currentValue);
                        setOpenTeam(false);
                      }}
                      className="hover:bg-sand hover:text-black"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          team === team.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {team.label}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={openSemiFinal} onOpenChange={setOpenSemiFinal}>
          <PopoverTrigger className="w-96" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={true}
              className="w-96 justify-between overflow-hidden"
            >
              {semiFinal
                ? semifinals?.find(
                    (semifinal: any) => semifinal.value == semiFinal,
                  )?.label
                : "Избери полуфинал"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" overflow-hidden p-0">
            <Command className="max-w-64 w-64 ">
              <CommandInput placeholder="Намери полуфинал" />
              <CommandEmpty>Полуфиналът не е намерен</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-64 max-h-96">
                  {semifinals?.map(
                    (semifinal: { label: string; value: string }) => (
                      <CommandItem
                        key={semifinal.value}
                        value={semifinal.value}
                        onSelect={(currentValue) => {
                          setSemiFinal(
                            currentValue === semiFinal ? "" : currentValue,
                          );
                          setOpenSemiFinal(false);
                        }}
                        className="hover:bg-sand hover:text-black"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            semiFinal === semifinal.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {semifinal.label}
                      </CommandItem>
                    ),
                  )}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          value={semiFinalResult}
          onChange={(e) => {
            setSemiFinalResult(e.target.value);
          }}
          placeholder="Резултат"
        />
        <Button
          className="ml-3"
          variant="destructive"
          onClick={() => handleClick()}
        >
          Добави
        </Button>
      </div>
    </div>
  );
}
