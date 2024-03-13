export const NAVIGATION_CATEGORIES = [
  {
    category: "root",
    label: "Начало",
    links: [
      {
        label: "Програма",
        url: "/schedule",
        isVisible: false,
        isNew: false,
      },
      {
        label: "Отбори",
        url: "/teams",
        isVisible: true,
        isNew: false,
      },
      {
        // TODO: да го преместим в "За Hack TUES" категорията
        label: "Програма",
        url: "/schedule",
        isVisible: true,
        isNew: true,
      },
      {
        label: "Ментори",
        url: "/mentors",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Теми",
        url: "/themes",
        isVisible: true,
        isNew: true,
      },
      {
        label: "Класация",
        url: "/rankings",
        isVisible: false,
        isNew: false,
      },
      {
        label: "С подкрепата на...",
        url: "/partners",
        isVisible: true,
        isNew: false,
      },
    ],
  },
  {
    category: "about",
    label: "За Hack TUES",
    links: [
      {
        label: "Нашият екип",
        url: "/ourteam",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Доброволци",
        url: "/volunteers",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Регламент",
        url: "/regulation",
        isVisible: true,
        isNew: false,
      },
      {
        label: "ЧЗВ",
        url: "/faq",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Архив",
        url: "/archive",
        isVisible: false,
        isNew: false,
      },
      {
        label: "Спонсори § Партньори",
        url: "/partners",
        isVisible: true,
        isNew: false,
      },
      {
        label: "Медиите за нас",
        url: "/media",
        isVisible: true,
        isNew: true,
      },
    ],
  },
  // XXX: as const type errors, investigate?
]; // as const;
