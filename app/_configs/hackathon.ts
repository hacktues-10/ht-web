import { HACKATHONS } from "./archive";

export const COUNTDOWN_START = new Date("Jan 02 2024 20:00:00 GMT+0200");
export const EVENT_START = new Date("Mar 13 2024 20:00:00 GMT+0200");
export const EVENT_END = new Date("Mar 16 2024 07:59:59 GMT+0200");

export const ALUMNI_REGISTRATION_START = new Date(
  "Jan 08 2024 13:00:00 GMT+0200",
);
export const STUDENTS_REGISTRATION_START = new Date(
  "Jan 29 2024 20:00:00 GMT+0200",
);

export const MAX_TEAMS_STUDENTS = 70;
export const MAX_TEAMS_ALUMNI = 14;

export const MIN_TEAM_MEMBERS_STUDENTS = 3;
export const MAX_TEAM_MEMBERS_STUDENTS = 5;

export const MIN_TEAM_MEMBERS_ALUMNI = 2;
export const MAX_TEAM_MEMBERS_ALUMNI = 3;

export const SUBTHEMES = [...HACKATHONS].reverse().flatMap((hackathon) => {
  const mainTheme = {
    [`${hackathon.theme} - ${hackathon.name}`]: "",
  };

  if (hackathon.subThemes.length === 0) return [mainTheme];

  const subThemes = hackathon.subThemes.map((theme) => {
    const [name, description] = Object.entries(theme)[0];
    return { [`${name} - ${hackathon.name}`]: description };
  });

  return [mainTheme, ...subThemes];
});

export const SCHEDULE = [
  {
    type: "workshop",
    title: "Git && GitHub",
    description:
      "Git and GitHub workshop. Learn how to use Git and GitHub. This is a very important skill for every developer. You will learn how to use Git and GitHub in a team environment.",
    startDate: new Date("Feb 15 2024 20:00:00 GMT+0200"),
    endDate: null,
  },
  {
    type: "workshop",
    title: "Python - Flask",
    description:
      "Python - Flask workshop. Learn how to use Python and Flask to build web applications. You will learn how to build a simple web application using Python and Flask.",
    startDate: new Date("Feb 21 2024 20:00:00 GMT+0200"),
    endDate: null,
  },
  {
    type: "workshop",
    title: "Embedded Basics",
    description:
      "Росен Витанов - Embedded Basics workshop. Learn the basics of embedded systems. You will learn how to use embedded systems to build simple applications.",
    startDate: new Date("Feb 26 2024 20:00:00 GMT+0200"),
    endDate: null,
  },
  {
    type: "workshop",
    title: "React",
    description: "React workshop",
    startDate: new Date("Feb 28 2024 20:00:00 GMT+0200"),
    endDate: null,
  },
  {
    type: "workshop",
    title: "Hack TUES X - В какво се забърках?",
    description: "Hack TUES X - В какво се забърках? workshop",
    startDate: new Date("Feb 28 2024 20:00:00 GMT+0200"),
    endDate: null,
  },
] as const;
