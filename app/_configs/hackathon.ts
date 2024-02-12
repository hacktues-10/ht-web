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

const ORGANIZATOR = "Организатор на Hack TUES X";

const MITKO = {
  image: null,
  name: "Димитър Желев",
  origin: ORGANIZATOR,
};

const BOZHO = {
  image: null,
  name: "Божидар Павлов",
  origin: ORGANIZATOR,
};

export const SCHEDULE = [
  {
    type: "workshop",
    title: "Работа в екип и генериране на идеи",
    description:
      "Python - Flask workshop. Learn how to use Python and Flask to build web applications. You will learn how to build a simple web application using Python and Flask.",
    startDate: new Date("Feb 13 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: null,
        name: "Кирилка Ангелова",
        origin: "АЗТУЕС",
      },
    ],
  },
  {
    type: "workshop",
    title: "Git && GitHub",
    description:
      "Git and GitHub workshop. Learn how to use Git and GitHub. This is a very important skill for every developer. You will learn how to use Git and GitHub in a team environment.",
    startDate: new Date("Feb 15 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [BOZHO, MITKO],
  },
  {
    type: "workshop",
    title: "Python - Flask",
    description:
      "Python - Flask workshop. Learn how to use Python and Flask to build web applications. You will learn how to build a simple web application using Python and Flask.",
    startDate: new Date("Feb 21 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: null,
        name: "Калоян Миладинов",
        origin: "Организатор на Hack TUES X",
      },
      BOZHO,
    ],
  },
  {
    type: "workshop",
    title: "Embedded Basics",
    description:
      "Росен Витанов - Embedded Basics workshop. Learn the basics of embedded systems. You will learn how to use embedded systems to build simple applications.",
    startDate: new Date("Feb 26 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: null,
        name: "Росен Витанов",
        origin: "Преподавател по ВМКС в ТУЕС",
      },
    ],
  },
  {
    type: "workshop",
    title: "React",
    description: "React workshop",
    startDate: new Date("Feb 28 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [MITKO, BOZHO],
  },
  {
    type: "workshop",
    title: "Hack TUES X - В какво се забърках?",
    description: "Hack TUES X - В какво се забърках? workshop",
    startDate: new Date("Feb 28 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: null,
        name: "Калин Георгиев",
        origin: "АЗТУЕС",
      },
      {
        image: null,
        name: "Никола Сачков",
        origin: "Организатор на Hack TUES X",
      },
    ],
  },
  {
    type: "youtube",
    title: "Официално откриване", // или Откриваща церемония?
    description: "Официално откриване на Hack TUES X",
    startDate: new Date("Mar 13 2024 18:00:00 GMT+0200"),
    endDate: new Date("Mar 13 2024 22:00:00 GMT+0200"),
  },
  {
    type: "in-person",
    title: "Време за работа",
    description: "Работа по проектите",
    startDate: new Date("Mar 13 2024 20:00:00 GMT+0200"),
    endDate: new Date("Mar 16 2024 07:59:59 GMT+0200"),
  },
  {
    type: "in-person",
    title: "Полуфинали",
    description: "Полуфинали на учениците", // а завършили?
    startDate: new Date("Mar 16 2024 08:00:00 GMT+0200"),
    endDate: new Date("Mar 16 2024 10:20:00 GMT+0200"),
  },
  {
    type: "youtube",
    title: "Финал",
    description: "Финал",
    startDate: new Date("Mar 16 2024 12:00:00 GMT+0200"),
    endDate: new Date("Mar 16 2024 17:30:00 GMT+0200"),
  },
  {
    type: "youtube",
    title: "Награждаване и закриваща церемония",
    description: "Награждаване и закриваща церемония",
    startDate: new Date("Mar 16 2024 17:30:00 GMT+0200"),
    endDate: new Date("Mar 16 2024 22:20:00 GMT+0200"),
  },
] as const;

export type ScheduleEvent = (typeof SCHEDULE)[number];
