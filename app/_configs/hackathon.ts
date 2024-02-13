import bozhoAvatar from "~/app/assets/lectors/bozho.webp";
import kalaAvatar from "~/app/assets/lectors/kala.webp";
import kalinAvatar from "~/app/assets/lectors/kalin.webp";
import kikiAvatar from "~/app/assets/lectors/kiki.webp";
import mitkoAvatar from "~/app/assets/lectors/mitko.webp";
import sachkovAvatar from "~/app/assets/lectors/sachkov.webp";
import vitanovAvatar from "~/app/assets/lectors/vitanov.webp";
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

const ORGANIZATOR_ORIGIN_TEXT = "Организатор";

const MITKO = {
  image: mitkoAvatar,
  name: "Димитър Желев",
  origin: ORGANIZATOR_ORIGIN_TEXT,
};

const BOZHO = {
  image: bozhoAvatar,
  name: "Божидар Павлов",
  origin: ORGANIZATOR_ORIGIN_TEXT,
};

export const SCHEDULE = [
  {
    type: "workshop",
    title: "Работа в екип и генериране на идеи",
    description:
      "Workshop, който ще ви даде ценни насоки и методи за ефективна работа в екип и техники за бързо генериране на иновативни идеи. Подходящо за всички, които искат да развият уменията си за екипна работа и креативно мислене.",
    startDate: new Date("Feb 13 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: kikiAvatar,
        name: "Кирилка Ангелова",
        origin: "АЗТУЕС",
      },
    ],
  },
  {
    type: "workshop",
    title: "Git && GitHub",
    description:
      "Лекцията ще ви представи основите на Git && GitHub, ключови за съвместна работа по проекти и управление на код.\nПрепоръчително за всеки, който не знае основите му функции!",
    startDate: new Date("Feb 15 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [BOZHO, MITKO],
  },
  {
    type: "workshop",
    title: "Python - Flask",
    description:
      "Тази лекция ще ви запознае с Flask - лек и мощен инструмент за създаване на уеб приложения с Python. Калоян и Божидар ще ви покажат как да започнете своите проекти с Flask, давайки ви основите и малко повече. Идеално за тези, които търсят да разширят своите умения в уеб разработката.\nВключете се за да научите повече!",
    startDate: new Date("Feb 21 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: kalaAvatar,
        name: "Калоян Миладинов",
        origin: ORGANIZATOR_ORIGIN_TEXT,
      },
      BOZHO,
    ],
  },
  {
    type: "workshop",
    title: "Embedded Basics",
    description: `Workshop, който ще ви предостави знания за основите на вградените микрокомпютърни системи, като покрие ключови концепции, хардуерни и софтуерни аспекти. Той ще ви помогне в създаването на вашия хардуерен проект.
Идеална възможност за всеки, който иска да се потопи в света на вградените микрокомпютърни системи и да разшири своите знания и умения.`,
    startDate: new Date("Feb 26 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: vitanovAvatar,
        name: "Росен Витанов",
        origin: "Преподавател по ВМКС в ТУЕС",
      },
    ],
  },
  {
    type: "workshop",
    title: "Потребителски интерфейси с React",
    description:
      "Потопете се в света на React и React Native, популярни библиотеки за създаване на UI за уеб и мобилни приложения. Димитър и Божидар ще ви покажат основите и как да започнете със създаването на проекти с помощта на React Native.",
    startDate: new Date("Feb 28 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [MITKO, BOZHO],
  },
  {
    type: "workshop",
    title: "Hack TUES X - В какво се забърках?",
    description: `Последният ни Workshop ще ви отговори на всички въпроси по емблематичния и обичания от всички туесари хакатон - Hack TUES. Какво е Hack TUES? Как протича той? В какво се забърках? Елате и разберете!`,
    startDate: new Date("Mar 06 2024 20:00:00 GMT+0200"),
    endDate: null,
    lectors: [
      {
        image: kalinAvatar,
        name: "Калин Георгиев",
        origin: "АЗТУЕС",
      },
      {
        image: sachkovAvatar,
        name: "Никола Сачков",
        origin: ORGANIZATOR_ORIGIN_TEXT,
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
