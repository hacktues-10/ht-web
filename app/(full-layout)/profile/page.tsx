import React, { useEffect, useState } from "react";

import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { getParticipantFromSession } from "~/app/participants/service";

export default async function ProfilePage() {
  //   const [participant, setParticipant] = useState(null);

  //   useEffect(() => {
  //     const fetchParticipant = async () => {
  //       const fetchedParticipant = await getParticipantFromSession();
  //       setParticipant(fetchedParticipant);
  //     };

  //     fetchParticipant();
  //   }, []);
  const participant = await getParticipantFromSession();

  return (
    <div className="w-72">
      {participant && (
        <>
          <Label htmlFor="firstName">Първо име</Label>
          <Input
            disabled
            placeholder={participant?.firstName ?? ""}
            id="firstName"
          />
          <Label htmlFor="secondName">Второ име</Label>
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
          {participant.phoneNumber && (
            <>
              <Label htmlFor="phoneNumber">Телефонен номер</Label>
              <Input
                disabled
                placeholder={participant.phoneNumber}
                id="phoneNumber"
              />
            </>
          )}
          {participant.grade && (
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
          <Input disabled placeholder={participant.email ?? ""} id="email" />
          <Label htmlFor="allergies">Алергии</Label>
          <Input
            className="h-22"
            placeholder={participant.allergies ?? ""}
            id="allergies"
          />
          <Label htmlFor="technologies">Технологии</Label>
          <TechnologySelectorComponent
            technologies={participant.technologies}
          />
        </>
      )}
    </div>
  );
}
