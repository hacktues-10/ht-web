// "use client"

// import { useState } from "react";
import { X } from "lucide-react";

import { Badge } from "~/app/components/ui/badge";
import { Button } from "~/app/components/ui/button";
import { Input } from "~/app/components/ui/input";
import { Label } from "~/app/components/ui/label";
import { Textarea } from "~/app/components/ui/textarea";
import { getParticipantFromSession } from "~/app/participants/service";
import { convertToPaginatedTechnologies } from "~/app/technologies";

export default async function ProfilePage() {
  //   useEffect(() => {
  //     const fetchParticipant = async () => {
  //       const fetchedParticipant = await getParticipantFromSession();
  //       setParticipant(fetchedParticipant);
  //     };

  //     fetchParticipant();
  //   }, []);
  const participant = await getParticipantFromSession();
  // const [techn, setTechn] = useState(
  //   await convertToPaginatedTechnologies(participant?.technologies ?? ""),
  // );

  const techn = await convertToPaginatedTechnologies(
    participant?.technologies ?? "",
  );
  // function removeTechnology(technologyToRemove: string) {
  //   if (participant?.technologies) {
  //     const updatedTechnologies = participant?.technologies
  //       .split(", ")
  //       .filter((tech) => tech !== technologyToRemove)
  //       .join(", ");

  //     setTechn(convertToPaginatedTechnologies(updatedTechnologies));
  //   }
  // }

  return (
    <div className="flex w-auto rounded-3xl bg-sand p-5 text-slate-950">
      {participant && (
        <div className="m-2">
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
        </div>
      )}
      {participant && (
        <div className="m-2">
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
          <Textarea
            placeholder={participant.allergies ?? ""}
            id="allergies"
            className="bg-sand"
          />
          <Label htmlFor="technologies">Технологии</Label>
          <div className="w-full flex-auto gap-2 rounded-lg border-2 border-slate-600 p-2">
            {techn.map((technology, index) => (
              <Badge
                // onClick={() => removeTechnology(technology.name)}
                variant="outline"
                style={{
                  backgroundColor: technology.color,
                  color: technology.textColor,
                }}
                className="m-1 whitespace-nowrap text-base"
                key={index}
              >
                {technology.name}
                <X color="" className="hover:cursor-pointer" />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
