import React, { useEffect } from "react";
import Image from "next/image";

import { getImageUrl } from "../../r2";
import DisplayTechnologies from "../Technologies/displayTechnologies";

import "./MentorCard.css"; // Apply additional styles in a separate CSS file

interface MentorInterface {
  mentor: {
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
    </div>
  );
};

export default Mentor;
