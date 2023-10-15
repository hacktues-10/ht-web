import React, { useEffect } from "react";
import Image from "next/image";

import { getImageUrl } from "../../_integrations/r2";
import DisplayTechnologies from "../Technologies/displayTechnologies";

import "./MentorCard.css"; // Apply additional styles in a separate CSS file

import { getParticipantFromSession } from "~/app/participants/service";
import { getTeamById } from "~/app/teams/service";
import { checkIfMentorIsTaken } from "../../mentors/services";
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
  const url = await getImageUrl({ fileName: mentor.fileName });
  const participant = await getParticipantFromSession();
  let participantTeam;
  if (participant?.team.id) {
    participantTeam = await getTeamById(participant.team.id);
  }

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
      {participant &&
      participant.team.isCaptain == true &&
      participantTeam?.id &&
      participantTeam?.mentorId == null &&
      !isMentorTaken ? (
        <ChooseMentor mentorId={mentor.id} teamId={participantTeam?.id} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Mentor;
