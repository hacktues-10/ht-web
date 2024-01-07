"use client";

import * as React from "react";
import { useState } from "react";

import { updateAllergiesTechnologiesAndIsLookingForTeam } from "~/app/_technologies/actions";
import { Button } from "~/app/components/ui/button";
import { Checkbox } from "~/app/components/ui/checkbox";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Textarea } from "~/app/components/ui/textarea";
import { useToast } from "~/app/components/ui/use-toast";
import {
  getParticipantFromSession,
  Participant,
} from "~/app/participants/service";
import {
  convertTechnologiesToText,
  convertToTechnology,
} from "~/app/technologies";
import TechnologiesTab from "../../../components/Technologies/technologiesContainer";

export default function ProfileInfo({
  participant,
}: {
  participant: Participant;
}) {
  const { toast } = useToast();
  const [allergies, setAllergies] = useState(participant.allergies ?? "");
  const [isLookingForTeam, setIsLookingForTeam] = useState(
    participant.isLookingForTeam,
  );
  const [selectedTechnologiesArray, setSelectedTechnologies] = useState(
    convertToTechnology(participant.technologies),
  );

  async function handleSubmitFullData() {
    const technText = convertTechnologiesToText(selectedTechnologiesArray);
    const { message } = await updateAllergiesTechnologiesAndIsLookingForTeam(
      allergies,
      technText,
      isLookingForTeam,
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
      <div className="rounded-3xl bg-sand p-5 text-slate-950 md:w-[500px] ">
        <div
          className={`mb-5 ml-auto mr-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full sm:h-32 sm:w-32 ${
            colors[(participant.firstName.charCodeAt(0) ?? 0) % 10]
          } text-center`}
        >
          <h1 className="p-2 text-3xl text-white sm:text-6xl">
            {participant.firstName.charAt(0).toUpperCase()}
          </h1>
        </div>
        <div className="sm:flex">
          <div className="m-2">
            <Label htmlFor="firstName">Име</Label>
            <Input
              disabled
              placeholder={participant.firstName}
              id="firstName"
            />
            <Label htmlFor="secondName">Презиме</Label>
            <Input
              disabled
              placeholder={participant.middleName ?? ""}
              id="secondName"
            />
            <Label htmlFor="lastName">Фамилия</Label>
            <Input disabled placeholder={participant.lastName} id="lastName" />

            <Label htmlFor="phoneNumber">Телефонен номер</Label>
            <Input
              disabled
              placeholder={participant.phoneNumber}
              id="phoneNumber"
            />
          </div>

          <div className="m-2">
            <Label htmlFor="grade">
              {parseInt(participant.grade) > 12 ? "Випуск" : "Клас"}
            </Label>
            <Input
              disabled
              placeholder={participant.grade + " " + participant.parallel}
              id="grade"
            />

            <Label htmlFor="email">Имейл</Label>
            <Input disabled placeholder={participant.email} id="email" />
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
        <div className="m-4">
          <div className="bg flex justify-center rounded-lg bg-background p-1 text-foreground">
            <TechnologiesTab
              badgeBorderColor="white"
              inputClassName=""
              technologiesFromParent={selectedTechnologiesArray}
              setTechnolgoies={setSelectedTechnologies}
            />
          </div>
          <div className="m-4 flex rounded-lg bg-background p-3 text-foreground">
            <Checkbox
              id="isLookingForTeam"
              // className="border-black"
              checked={isLookingForTeam}
              onCheckedChange={() => setIsLookingForTeam(!isLookingForTeam)}
            />
            <div className="space-y-1 pl-4 leading-none">
              <label htmlFor="isLookingForTeam">Търся си отбор</label>
              <p className="text-sm text-muted-foreground">
                Други участници ще могат да ви канят в своите отбори.
              </p>
            </div>
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
