"use client";

import * as React from "react";
import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { updateAllergiesAndTechnologies } from "~/app/_technologies/actions";
import { Badge } from "~/app/components/ui/badge";
import { Button } from "~/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/app/components/ui/command";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/components/ui/popover";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import { getParticipantFromSession } from "~/app/participants/service";
import {
  convertTechnologiesToText,
  convertToTechnology,
  prepareTechnologies,
} from "~/app/technologies";
import { cn } from "~/app/utils";

export default function ProfileInfo({
  participant,
}: {
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>;
}) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [allergies, setAllergies] = useState(participant?.allergies ?? "");
  const [technologies, setTechnologies] = useState(
    prepareTechnologies(participant?.technologies ?? ""),
  );

  const [selectedTechnologiesArray, setSelectedTechnologies] = useState(
    convertToTechnology(participant?.technologies ?? ""),
  );

  function handleRemove(technologyValue: string | undefined) {
    const foundTechnology = selectedTechnologiesArray.find((technology) => {
      return technology?.value === technologyValue;
    });

    if (foundTechnology) {
      setTechnologies((prevTechnologies) => {
        const updatedTechnologies = [...prevTechnologies, foundTechnology];
        updatedTechnologies.sort((a, b) => a.id - b.id);
        return updatedTechnologies;
      });

      const updatedSelectedTechnologies = selectedTechnologiesArray.filter(
        (technology) => technology?.value !== foundTechnology?.value,
      );

      setSelectedTechnologies(updatedSelectedTechnologies);
    }
  }

  function handleSubmit() {
    const foundTechnology = technologies.find((technology) => {
      return technology?.value === value;
    });

    const updatedTechnologies = technologies.filter(
      (technology) => technology.value !== foundTechnology?.value,
    );

    setTechnologies(updatedTechnologies);

    setSelectedTechnologies((prevTechnologies) => {
      return [...prevTechnologies, foundTechnology];
    });

    setValue("");
    setOpen(false);
  }

  async function handleSubmitFullData() {
    const technText = convertTechnologiesToText(selectedTechnologiesArray);
    if (!participant?.id) {
      return null;
    }
    const { message } = await updateAllergiesAndTechnologies(
      allergies,
      technText,
      participant.id,
    );
    toast({
      variant: "sand",
      title: message.title,
      description: message.description,
    });
  }

  const colors = [
    "bg-red-700",
    "bg-green-700",
    "bg-orange-700",
    "bg-yellow-700",
    "bg-emerald-700",
    "bg-cyan-700",
    "bg-sky-700",
    "bg-indigo-700",
    "bg-violet-700",
    "bg-purple-700",
  ];

  return (
    <div>
      <div className="rounded-3xl bg-sand p-5 text-slate-950 ">
        <div
          className={`mb-5 ml-auto mr-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full sm:h-32 sm:w-32 ${
            colors[(participant?.firstName?.charCodeAt(0) ?? 0) % 10]
          } text-center`}
        >
          <h1 className="p-2 text-3xl text-white sm:text-6xl">
            {participant?.firstName?.charAt(0).toUpperCase()}
          </h1>
        </div>
        <div className="sm:flex">
          <div className="m-2">
            <Label htmlFor="firstName">Име</Label>
            <Input
              disabled
              placeholder={participant?.firstName ?? ""}
              id="firstName"
            />
            <Label htmlFor="secondName">Презиме</Label>
            <Input
              disabled
              placeholder={participant?.firstName ?? ""}
              id="secondName"
            />
            <Label htmlFor="lastName">Фамилия</Label>
            <Input
              disabled
              placeholder={participant?.lastName ?? ""}
              id="lastName"
            />
            {participant?.phoneNumber && (
              <>
                <Label htmlFor="phoneNumber">Телефонен номер</Label>
                <Input
                  disabled
                  placeholder={participant.phoneNumber}
                  id="phoneNumber"
                />
              </>
            )}
          </div>
          <div className="m-2">
            {participant?.grade && (
              <>
                <Label htmlFor="grade">
                  {parseInt(participant.grade) > 12 ? "Випуск" : "Клас"}
                </Label>
                <Input
                  disabled
                  placeholder={participant.grade + " " + participant.parallel}
                  id="grade"
                />
              </>
            )}

            <Label htmlFor="email">Имейл</Label>
            <Input disabled placeholder={participant?.email ?? ""} id="email" />
            <div className="mb-3 mt-3">
              <Label htmlFor="allergies">Алергии</Label>
              <Textarea
                id="allergies"
                className="bg-sand"
                value={allergies}
                onChange={(event) => setAllergies(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="m-auto">
          <div className="flex justify-center">
            <div className="self-center">
              <Label htmlFor="technologies" className="text-center">
                Технологии
              </Label>
              <div className="w-96 flex-auto gap-2 self-center rounded-lg border-2 border-slate-600 p-2">
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedTechnologiesArray.length === 0 && (
                    <Badge
                      variant="outline"
                      className="m-1 whitespace-nowrap text-sm opacity-0"
                    >
                      a
                    </Badge>
                  )}
                  {selectedTechnologiesArray.map((technology) => (
                    <Badge
                      onClick={() => handleRemove(technology?.value)}
                      variant="outline"
                      style={{
                        backgroundColor: technology?.color,
                        color: technology?.textColor,
                      }}
                      className="m-1 whitespace-nowrap text-sm hover:cursor-pointer"
                      key={technology?.id}
                    >
                      {technology?.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center align-middle">
            <div className="relative">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between hover:bg-background hover:text-white"
                  >
                    {value
                      ? technologies?.find(
                          (technology) => technology.value == value,
                        )?.name
                      : "Избери технология"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command className="bg-sand ">
                    <CommandInput
                      className="placeholder:text-black"
                      placeholder="Намери технология"
                    />
                    <CommandEmpty>Технологията не е намерена</CommandEmpty>
                    <CommandGroup className="mb-1 max-h-[150px] overflow-y-auto bg-sand">
                      {technologies?.map((technology) => (
                        <CommandItem
                          className="border-2 border-transparent text-black hover:border-black"
                          key={technology.value}
                          value={technology.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === technology.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {technology.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <Button
              className="ml-3 hover:bg-background hover:text-white"
              variant="outline"
              onClick={() => handleSubmit()}
            >
              Добави
            </Button>
          </div>
          <div className="mt-3 flex justify-center">
            <Button
              variant="destructive"
              className="self-center"
              onClick={() => handleSubmitFullData()}
            >
              Промени
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
