import React from "react";
import Image from "next/image";

import { getImageUrl } from "../../_integrations/r2";
import DisplayTechnologies from "../Technologies/displayTechnologies";

import "./MentorCard.css"; // Apply additional styles in a separate CSS file

import { IfHTFeatureOn } from "~/app/_integrations/components";
import { checkIfMentorIsTaken } from "~/app/(full-layout)/mentors/service";
import { getTeamById } from "~/app/(full-layout)/teams/service";
import { getParticipantFromSession } from "~/app/participants/service";
import ChooseMentor from "./ChooseMentor";

interface MentorInterface {
  mentor: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    companyName: string | null;
    phoneNumber: string | null;
    description: string | null;
    tShirtId: number;
    allergies: string | null;
    technologies: string | null;
    youtubeURL: string | null;
    fileName: string;
  };
}

const Mentor: React.FC<MentorInterface> = async ({ mentor }) => {
  // FIXME: N+1 query right here
  const url = await getImageUrl({ fileName: mentor.fileName });
  // FIXME: possibly another N+1 query right here
  const participant = await getParticipantFromSession();
  let participantTeam;
  if (participant?.team.id) {
    // FIXME: and another N+1 query right here
    participantTeam = await getTeamById(participant.team.id);
  }

  // FIXME: and yet another N+1 query right here, possibly??
  const isMentorTaken = await checkIfMentorIsTaken(mentor.id);

  return (
    <div className="mentor-card">
      <div className="mentor-card-header">
        <h2 className="mentor-name">
          {mentor.firstName} {mentor.lastName}
        </h2>
        <Image
          src={url}
          alt={mentor.firstName + " " + mentor.lastName}
          width={200}
          height={200}
        />
      </div>
      <div className="mentor-details">
        <p className="mentor-email">{mentor.email}</p>
        <p className="mentor-company">{mentor.companyName}</p>
        <p className="mentor-description">{mentor.description}</p>
        <DisplayTechnologies technologies={mentor.technologies} />
      </div>
      <IfHTFeatureOn feature="choose-mentor">
        {participant &&
        participant.team.isCaptain == true &&
        participantTeam?.id &&
        participantTeam?.mentorId == null &&
        !isMentorTaken ? (
          <ChooseMentor mentorId={mentor.id} teamId={participantTeam?.id} />
        ) : (
          <div></div>
        )}
      </IfHTFeatureOn>
    </div>
  );
};

export default Mentor;
