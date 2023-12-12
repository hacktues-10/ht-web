"use client";

import * as React from "react";
import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge } from "~/app/components/ui/badge";
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
import { getParticipantFromSession } from "../participants/service";
import {
  convertTechnologiesToText,
  convertToTechnology,
  prepareTechnologies,
} from "../technologies";
import { updateAllergiesAndTechnologies } from "../user/configure/actions";
import { cn } from "../utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function RenderProfileInfo({
  participant,
}: {
  participant: Awaited<ReturnType<typeof getParticipantFromSession>>;
}) {
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
    const { success, message } = await updateAllergiesAndTechnologies(
      allergies,
      technText,
      participant.id,
    );
  }

  return (
    <div className="w-auto rounded-3xl bg-sand p-5 text-slate-950 ">
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
              placeholder={participant?.allergies ?? ""}
              id="allergies"
              className="bg-sand"
              value={allergies}
              onChange={setAllergies}
            />
          </div>
        </div>
      </div>
      <div className="ml-auto mr-auto">
        <Label htmlFor="technologies">Технологии</Label>
        <div className="w-auto flex-auto gap-2 rounded-lg border-2 border-slate-600 p-2">
          {selectedTechnologiesArray.map((technology, index) => (
            <Badge
              onClick={() => handleRemove(technology?.value)}
              variant="outline"
              style={{
                backgroundColor: technology?.color,
                color: technology?.textColor,
              }}
              className="m-1 whitespace-nowrap text-sm"
              key={index}
            >
              {technology?.name}
              <X color="" className="hover:cursor-pointer" />
            </Badge>
          ))}
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
                    {technologies?.slice(0, 5).map((technology) => (
                      <CommandItem
                        className="border-2 border-transparent text-black hover:border-black"
                        key={technology.value}
                        value={technology.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
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
                    <div className="overflow-y-auto">
                      {technologies?.slice(5).map((technology) => (
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
                    </div>
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
  );
}
/*
  
        */
