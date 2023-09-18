import React from "react";

import { convertToTechnology } from "~/app/technologies";

import "./styles.css";

const DisplayTechnologies = ({
  technologies,
}: {
  technologies: string | null;
}) => {
  const technologiesArray = convertToTechnology(
    technologies ? technologies : "",
  );

  return (
    <div className="selected-technologies">
      {technologiesArray?.map((technology) => (
        <span
          key={technology?.id}
          style={{
            backgroundColor: technology?.color,
            margin: 2,
            padding: 2,
            borderRadius: 5,
          }}
        >
          {technology?.name}
        </span>
      ))}
    </div>
  );
};

export default DisplayTechnologies;
