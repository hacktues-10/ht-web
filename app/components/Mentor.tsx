import React, { useEffect } from "react";
import Image from "next/image";

import { getImageUrl } from "../r2";
import DisplayTechnologies from "./Technologies/displayTechnologies";

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
    fileName: string | "";
  };
}

const mentorCardStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const nameStyle = {
  fontSize: "1.2rem",
  marginBottom: "5px",
};

const emailStyle = {
  color: "#555",
};

const companyStyle = {
  color: "#888",
};

const descriptionStyle = {
  marginTop: "10px",
};

export const Mentor: React.FC<MentorInterface> = async ({ mentor }) => {
  const url = await getImageUrl({ fileName: mentor.fileName });
  return (
    <div style={mentorCardStyle}>
      <h2 style={nameStyle}>
        {mentor.firstName} {mentor.lastName}
      </h2>
      <Image
        src={url}
        alt={mentor.firstName + " " + mentor.lastName}
        width={200}
        height={200}
      />
      <p style={emailStyle}>{mentor.email}</p>
      <p style={companyStyle}>{mentor.companyName}</p>
      <p style={descriptionStyle}>{mentor.description}</p>
      <DisplayTechnologies technologies={mentor.technologies} />
    </div>
  );
};
