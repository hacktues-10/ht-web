import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { addTeamResultFinal } from "~/app/(full-layout)/teams/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/components/ui/select";
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
  const [openТеаm, setOpenTeam] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);

  const [isFinalist, setIsFinalist] = useState(false);
  const [selectedTeam, setTeam] = useState("");
  const [finalResult, setFinalResult] = useState("");
  const { toast } = useToast();
  async function handleClick() {
    const res = await addTeamResultFinal(selectedTeam, finalResult);
    toast({
      variant: res?.success ? "sand" : "destructive",
      title: res?.message,
    });
    setOpenTeam(false);
    setIsFinalist(false);
    setTeam("");
    setFinalResult("");
  }

  return (
    <div className="m-2  w-1/2 rounded-xl border-2 border-yellow-200">
      <h3 className="m-5 mb-0 font-semibold">Добави резултати за финал</h3>
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
        <Select onValueChange={(newValue) => setIsFinalist(Boolean(newValue))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Финалист ли е" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"true"}>Да</SelectItem>
            <SelectItem value={"false"}>Не</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={finalResult}
          onChange={(e) => {
            setFinalResult(e.target.value);
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
