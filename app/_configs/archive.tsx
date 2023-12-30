import { Comfortaa, Montserrat, Roboto, Rubik } from "next/font/google";
import localFont from "next/font/local";

import {
  HT1Background,
  HT2Background,
  HT3Background,
  HT4Background,
  HT5Background,
  HT6Background,
  HT7Background,
  HT8Background,
} from "../components/archive/backgrounds";
import { HTLogo } from "../components/logos";
import { JUNE, MARCH, OCTOBER } from "../utils";

const htSecurityFont = localFont({
  src: "../assets/htsecurity.ttf",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});
const rubik = Rubik({
  subsets: ["cyrillic", "latin"],
});
const comfortaa = Comfortaa({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});
const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["cyrillic", "latin"],
});

export const HACKATHONS = [
  {
    id: "hacktues",
    name: "Hack TUES",
    logo: (
      <HTLogo className="text-white">
        Hack <span className="text-[#446576ff]">TUES</span>
      </HTLogo>
    ),
    startDate: new Date(2015, JUNE, 26),
    endDate: new Date(2015, JUNE, 29),
    location: "ТУЕС",
    format: "присъствен",
    winners: [
      {
        place: "first",
        participants: ["Телерик Арсов", "Антонио Милев", "Мартин Дацев"],
        name: "Go6o",
        project: {
          description:
            "система за автоматизирана оценка на тестове, на основата на технология за разпознаване на изображения,",
        },
        image: "https://hacktues.pythonanywhere.com/static/frontend/ht-1.jpg",
        extraSpecialPrizes:
          "възможност за двуседмична практика в „Nemetschek България“, безплатно обучение за първия модул Fundamentals на „SoftUni“ и специалната награда на „ChaosGroup“",
      },
      {
        place: "second",
        participants: [
          "Антонио Миндов",
          "Дария Никитова",
          "Кристиана Иванова",
          "Петър Петров",
          "Ясен Алексиев",
        ],
        name: "R&T",
        project: { description: "Визуализация на код с блок-схеми" },
        image: "https://hacktues.pythonanywhere.com/static/frontend/ht-2.jpg",
        extraSpecialPrizes: "„MusalaSoft“ и „StandByte“",
      },
      {
        place: "third",
        participants: [
          "Габриел Гарвалов",
          "Дейвид-Николас Петров",
          "Илиян Кордев",
          "Филип Пепегов",
          "Кристиан Томов",
        ],
        name: "Coding Masters",
        project: {
          description:
            "Система за обмен на информация и знания между учениците",
        },
        image: "https://hacktues.pythonanywhere.com/static/frontend/ht-3.jpg",
      },
    ],
    stats: {
      participants: 84,
      teams: 18,
      awardedTeams: 6,
    },
    theme: "Автоматизиране и подобряване на учебния процес в ТУЕС",
    specialPrizes: [
      {
        team: "P2W",
        project: {
          description: "забавна електронна игра с образователни въпроси",
        },
        prize: "награда за оригинална идея",
      },
      {
        team: "TANKK Crew",
        project: {
          description: "онлайн компилатор и система за проверка на задачи",
        },
        prize: "награда за най-добро представяне и награда от „HackBulgaria“",
      },
      {
        team: "Няма значение",
        project: { description: "електронен дневник" },
        prize: "специална награда от „Nemetschek България“",
      },
    ],
    description: (
      <>
        <p>
          Трима осмокласници спечелиха голямата награда в първото издание на
          HackTUES.
        </p>
        <p>Всички отбори получиха сертификати за успешно участие.</p>
        <p>
          Инициативата беше подкрепена от „SoftUni“, „HackBulgaria“,
          „MusalaSoft“, „ChaosGroup“, „Astea“, „Nemetschek“, „StandByte“ и
          „Subway“. Идеята за състезанието дойде от ученици от 10-ти клас в ТУЕС
          и срещна подкрепата на ръководството на училището.
        </p>
        <blockquote>
          <p>
            „Станахме свидетели на едно изключително интересно състезание и се
            убедихме, че учениците имат много идеи. Наша задача е да създаваме
            възможности тези идеи да видят бял свят. Хакатонът е една чудесна
            възможност за това и съм убедена, че той ще се превърне в традиция
            за ТУЕС.“
          </p>
          <footer>- доц. д-р инж. Стела Стефанова, директор на ТУЕС</footer>
        </blockquote>
      </>
    ),
    websiteArchiveUrl: null,
    aztuesArticleUrl:
      "https://aztues.bg/%d0%bf%d1%8a%d1%80%d0%b2%d0%b8-%d1%83%d1%87%d0%b5%d0%bd%d0%b8%d1%87%d0%b5%d1%81%d0%ba%d0%b8-%d1%85%d0%b0%d0%ba%d0%b0%d1%82%d0%be%d0%bd-%d0%b2-%d1%82%d1%83%d0%b5%d1%81/",
    font: null,
    themeStyle: {
      "--background": "var(--brand)",
      "--foreground": "0 0% 100%",
      "--primary": "199 53% 67%",
      "--primary-foreground": "var(--sand-foreground)",
      "--brand": "200 27% 36%",
      "--brand-foreground": "0 0% 100%",
      "--card": "var(--primary)",
      "--card-foreground": "0 0% 100%",
    },
    colorClasses: "bg-gradient-to-b from-transparent to-brand/30",
    background: HT1Background,
  },
  {
    id: "hacktues-2",
    name: "Hack TUES 2",
    logo: (
      <HTLogo className="text-white">
        Hack <span className="text-[#446576ff]">TUES</span> 2
      </HTLogo>
    ),
    startDate: new Date(2015, OCTOBER, 9),
    endDate: new Date(2015, OCTOBER, 11),
    location: "ТУЕС",
    format: "присъствен",
    winners: [
      {
        place: "first",
        participants: [
          "Жанет Хаджиангелова",
          "Мария Стоянова",
          "Георги Данчев",
          "Николай Миланов",
          "Димитър Кацаров",
        ],
        name: "ASDF Unicorns",
        project: {
          description: "Образователна игра за опазване на околната среда",
        },
      },
      {
        place: "second",
        participants: [
          "Николета Далакчиева",
          "Владимир Младенов",
          "Марина Тихова",
          "Лъчезар Младенов",
        ],
        name: "Walking Chaos",
        project: {
          description:
            "Уебсайт за продажба и обмен на продукти от рециклирани материали",
        },
      },
      {
        place: "third",
        participants: [
          "Андреа Георгиева",
          "Николай Рангелов",
          "Александър Велинов",
          "Калин Карев",
          "Светлин Йорданов",
          "Теодор Добрев",
        ],
        name: "The Tanks",
        project: {
          description: "Приложение за лекари и медицински работници",
        },
      },
    ],
    stats: {
      participants: 100,
      teams: 18,
      awardedTeams: 7,
    },
    theme: "Подпомагaне опазването на околната среда и социални каузи",
    specialPrizes: [
      {
        team: "For Code Sake",
        project: {
          description:
            "приложение за синхронизирано изпълнение на песни от няколко мобилни телефона",
        },
        prize:
          "специална награда за най-добра презентация и награда на „Chaos Group“",
      },
      {
        team: "Fanatic",
        project: {
          description:
            "приложение, което би улеснило електронното гласуване чрез разчитане на лични карти и онлайн справка в база данни от избиратели",
        },
        prize: "специалната награда на Microsoft",
      },
      {
        team: "Alfa",
        project: {
          description: "уебсайт с информация за различни заболявания",
        },
        prize: "наградата на „MusalaSoft“",
      },
    ],
    description: (
      <>
        <p>Вторият Hack TUES се проведе през есента на 2015 г.</p>
        <p>
          Отборите, класирани на призовите три места получиха и награди от
          „Delta.bg“.
        </p>
        <p>
          HackTUES 2 бешее подкрепен от „Astea Solutions“, „ChaosGroup“,
          „HackBulgaria“, „Microsoft“, „Obecto“, „SAP“, „Musala Soft“,
          „Delta.bg“, „Telerik“ и „Progress Company“. Медиен партньор на
          хакатона бешее „Socialevo.net“. Събитието бешее част от Европейската
          седмица на програмирането (EU Code Week), която цели да популяризира
          програмирането сред широк кръг млади хора.
        </p>
        <blockquote>
          <p>
            „Хакатонът е поредното доказателство, че учениците винаги има с
            какво да ни изненадат. Чудесните идеи, разработени от учениците,
            правят това състезание уникално и няма съмнение, че HackTUES вече се
            превръща в една от добрите традиции в ТУЕС.“
          </p>
          <footer>- доц. д-р инж. Стела Стефанова, директор на ТУЕС</footer>
        </blockquote>
      </>
    ),
    websiteArchiveUrl: null,
    aztuesArticleUrl:
      "https://aztues.bg/%d0%b2%d1%82%d0%be%d1%80%d0%b8-%d1%83%d1%87%d0%b5%d0%bd%d0%b8%d1%87%d0%b5%d1%81%d0%ba%d0%b8-%d1%85%d0%b0%d0%ba%d0%b0%d1%82%d0%be%d0%bd-%d0%b2-%d1%82%d1%83%d0%b5%d1%81/",
    font: null,
    themeStyle: {
      "--background": "var(--brand)",
      "--foreground": "0 0% 100%",
      "--primary": "199 53% 67%",
      "--primary-foreground": "var(--sand-foreground)",
      "--brand": "200 27% 36%",
      "--brand-foreground": "0 0% 100%",
      "--card": "var(--primary)",
      "--card-foreground": "0 0% 100%",
    },
    colorClasses: "bg-gradient-to-b from-transparent to-brand/30",
    background: HT2Background,
  },
  {
    id: "hacktues-3",
    name: "Hack TUES 3",
    logo: (
      <HTLogo className="text-white">
        Hack <span className="text-[#09c0de]">TUES</span>{" "}
        <span className="text-[#b2006e]">3</span>
      </HTLogo>
    ),
    startDate: new Date(2017, MARCH, 24),
    endDate: new Date(2017, MARCH, 26),
    location: "ТУЕС",
    format: "присъствен",
    winners: [
      {
        place: "first",
        participants: [
          "Лазар Френкев",
          "Александър Вербовский",
          "Андрей Стрински",
          "Християн Генчев",
          "Алекс Стефанов",
        ],
        name: "Зор",
        project: {
          name: "Artsteler",
          description:
            "2D Platformer с puzzle game елементи (забавна игра, създадена за Android)",
        },
        image: "https://hacktues.pythonanywhere.com/static/frontend/ht3-1.jpg",
        extraSpecialPrizes:
          "възможност да довършат проекта си с екип на „TelebidPro“, индивидуална сума за закупуване на хардуер и възможност за безплатно обучение в един семестър в „SoftUni“",
      },
      {
        place: "second",
        participants: [
          "Телерик Арсов",
          "Стефан Бабуков",
          "Николай Милчев",
          "Мартин Дацев",
        ],
        name: "To6o",
        project: {
          name: "Micromanipulator",
          description: "симулация на генетичен алгоритъм",
        },
        image: "https://hacktues.pythonanywhere.com/static/frontend/ht3-2.jpg",
      },
      {
        place: "third",
        participants: [
          "Георги Корчаков",
          "Кристиян Йочев",
          "Йордан Златанов",
          "Симеон Георгиев",
          "Александър Стоичков",
        ],
        name: "Top8",
        project: {
          name: "Image Marker",
          description:
            "уеб приложение за създаване и редактиране на изображения, което работи на всякакви платформи",
        },
        image: "https://hacktues.pythonanywhere.com/static/frontend/ht3-3.jpg",
      },
    ],
    stats: {
      participants: 136,
      teams: 31,
      awardedTeams: 8,
    },
    theme: "Art && Creativity", // XXX: или Art&&Creativity?
    specialPrizes: [
      {
        team: "Pu6ki",
        project: {
          name: "Tarina",
          description: "уеб приложение за споделено създаване на истории",
        },
        prize:
          "специална награда на „TelebidPro“ и възможност за финализиране на проекта",
      },
      {
        team: "Костенурки Нинджа",
        project: {
          name: "Project FUN",
          description: "уебсайт за състезания с рисуване",
        },
        prize: "възможност от „VMware“ за финализиране на проекта",
      },
      {
        team: "Geko Snek",
        project: {
          name: "Мотика Motors",
          description: "робот с 4 колела и самостоятелно управление",
        },
        prize: "специална награда от „VMware“",
      },
      {
        team: "To_si_e_za_nas",
        project: {
          name: "Visual Delight",
          description: "социална мрежа за споделяне на креативни идеи",
        },
        prize: "специална награда от „VMware“",
      },
      {
        team: "Programartists",
        project: {
          name: "Made2Make",
          description:
            "робот, който рисува аналогови и цифрови схеми и платки по зададена картинка",
        },
        prize: "специалната награда на „SAP“",
      },
    ],
    description: (
      <>
        <p>
          Освен наградите от организаторите на Hack TUES 3, отборите на първите
          три места получиха и награди от партньорите на хакатона. Те можеха да
          посетят и офисите на „Dopamine“, „SAP“, „TelebidPro“ и „VMware“.
        </p>
        <p>
          Представителите на Dopamine връчиха и индивидуални награди на петима
          от участниците в хакатона – 24 инчови монитори.
        </p>
        <p>
          За реализацията на проектите в рамките на 3 дена допринесоха и 29-те
          ментори доброволци – завършили ТУЕС-ари и представители на партньорите
          на хакатона. Партньори на Hack TUES 3 са „Dopamine“, „SAP“,
          „TelebidPro“, „VMware“, „Nemetschek Bulgaria“, „Astea Solutions“,
          „CloudBalkan“, „Musala Soft“, „Chaos Group“ и „Smartcom Bulgaria“.
        </p>
        <p>
          Ученическият хакатон в ТУЕС се превърна в традиция от 2015 г. по
          инициатива на ученици от училището. Организацията на мащабното събитие
          през 2017 г. се проведе от ученически екип от 11А клас, подкрепен от
          ръководството, преподавателите и персонала в ТУЕС, завършили ТУЕС-ари,
          както и ученици-доброволци от училището.
        </p>
      </>
    ),
    websiteArchiveUrl: null,
    aztuesArticleUrl:
      "https://aztues.bg/hack-tues-3-%d0%bf%d0%b5%d1%82%d0%b8%d0%bc%d0%b0%d1%82%d0%b0-%d0%bc%d1%83%d1%81%d0%ba%d0%b5%d1%82%d0%b0%d1%80%d0%b8/",
    font: null,
    themeStyle: {
      "--background": "289 68% 11%",
      "--foreground": "0 0% 100%",
      "--primary": "var(--brand)",
      "--primary-foreground": "var(--brand-foreground)",
      "--brand": "188 92% 45%",
      "--brand-foreground": "var(--sand-foreground)",
      "--card": "323 100% 75%",
      "--card-foreground": "0 0% 100%",
    },
    colorClasses: "bg-background",
    background: HT3Background,
  },
  {
    id: "hacktues-30x",
    name: "Hack 30xTUES",
    logo: (
      <HTLogo className="text-[#00ffe4ff]">
        Hack <sup>30x</sup>TUES
      </HTLogo>
    ),
    startDate: new Date(2018, MARCH, 15),
    endDate: new Date(2018, MARCH, 18),
    location: "ТУЕС",
    format: "присъствен",
    winners: [
      {
        place: "first",
        participants: [
          "Телерик Арсов",
          "Ивона Мирчева",
          "Владислав Георгиев",
          "Мартин Дацев",
          "Петър Милев",
        ],
        name: "COCOBE",
        project: {
          description:
            "приложение за резюмиране на текст, използващо невронни мрежи и машинно самообучение",
        },
        image:
          "https://hacktues.pythonanywhere.com/static/frontend/h30xt-1.jpg",
        extraSpecialPrizes:
          "специална награда на „TelebidPro“ с възможност за стаж и менторство",
      },
      {
        place: "second",
        participants: [
          "Георги Любенов",
          "Виктор Велев",
          "Антон Янчев",
          "Самуил Георгиев",
        ],
        name: "Old and Bald",
        project: {
          description:
            "приложение, базирано на машинно самообучение, за чатбот на историческа тема, което предлага резюме на текстове по дадена тема, спрямо интересите на ползвателите",
        },
        image:
          "https://hacktues.pythonanywhere.com/static/frontend/h30xt-2.jpg",
      },
      {
        place: "third",
        participants: [
          "Михаил Киров",
          "Петър Николов",
          "Денис Бързанов",
          "Тони Пеловски",
          "Стефан Стефанов",
        ],
        name: "IDK",
        project: { description: "Игрална конзола" },
        image:
          "https://hacktues.pythonanywhere.com/static/frontend/h30xt-3.jpg",
      },
    ],
    stats: {
      participants: 206,
      teams: 45,
      awardedTeams: 11,
    },
    theme: "Old School / New Technologies",
    specialPrizes: [
      {
        team: "Mamutite222",
        project: {
          description: "игра, вдъхновена от битката в Дюнкерк",
        },
        prize: "отличени от развойния център на „SAP“ в София",
        participants: [
          "Георги Стефанов",
          "Самуил Иванов",
          "Владислав Миленков",
          "Стефан Гълъбов",
        ],
      },
      {
        team: "Autardia",
        project: { description: "игра на пайтън тип space invadors" },
        prize: "награда на Софтуерния университет",
        participants: [
          "Кристиян Стоименов",
          "Стела Касабова",
          "Виолета Кабаджова",
          "Стефани Стайкова",
          "Стефан Босев",
        ],
      },
      {
        team: "Ime",
        project: { description: "игра в терминал" },
        prize: "отличени от „Немечек България“ за систематичен подход",
        participants: ["Николай Станишев", "Иван Милев", "Иво Тодоров"],
      },
      {
        team: "Why not",
        project: {
          description: "проект с вградени микрокомпютърни системи",
        },
        prize: "награда от „Статсофт“",
        participants: [
          "Кристиян Стоименов",
          "Калоян Ангелов",
          "Виктория Радкова",
          "Слав Кирилов",
          "Християн Генчев",
        ],
      },
      {
        team: "Project Hogwarts",
        project: { description: "текстов редактор" },
        prize: "отличен от „Cloud Balkan“",
        participants: [
          "Александър Стоичков",
          "Иван Димитров",
          "Кристиян Йочев",
          "Георги Корчаков",
          "Виктор Петров",
        ],
      },
      {
        team: "Programming Zygotes",
        project: {
          description: "редактор, разчитащ текст от снимка",
        },
        prize: "отличен от „Cloud Balkan“",
        participants: [
          "Милен Илиев",
          "Михаил Колев",
          "Антонио Такев",
          "Валери Добрев",
          "Николай Йончев",
        ],
      },
      {
        team: "Thunder System",
        project: null,
        prize: "награда от „Live to Lift“",
        participants: [
          "Мартин Вайер",
          "Боян Иванов",
          "Мартин Врачев",
          "Мартин Дамянов",
          "Петър Дамянов",
        ],
      },
    ],
    description: (
      <>
        <p>
          Четвъртото издание на тридневния ученически хакатон Hack 30xTUES беше
          посветено на 30-годишния юбилей на училището.
        </p>
        <p>
          Отборите победители получиха като награди възможност за закупуване на
          техника, награди от „TelebidPro“, „SAP“ и „Uber Engineering в София“,
          както и посешение в офиса на „SoftServe“. Теодор Станишев от отбор
          „Fluffy Bears“ получи персонална награда от „ScaleFocus“.
        </p>
        <p>
          В журито на полуфиналите и финалите на хакатона участваха
          представители на компаниите-партньори, ИТ професионалисти, завършили
          ТУЕС, и преподаватели от училището. Спонсори на юбилейното издание
          Hack 30xTUES са развойният център на „SAP“ в София, „SoftServe“,
          „TelebidPro“, „VMware“, „Dopamine“, „ScaleFocus“, Софтуерен
          Университет, „Accedia“, „Astea Solutions“, „Немечек България“ и „Uber
          Engineering в София“. Партньори в организацията на събитието са „София
          Тех Парк“, „Смартком - България“ АД, „init Lab“, „Cloud Balkan“ и
          „Пирин Спринг“. В хакатона участваха почти половината ученици в ТУЕС.
          В работата им помагаха над 40 ИТ професионалисти като ментори -
          представители на компаниите-партньори, експерти, завършили училището
          преди години и преподаватели. Събитието беше организирано от екип от
          около 30 ученици, доброволци и представители на Асоциацията на
          завършилите ТУЕС.
        </p>
      </>
    ),
    websiteArchiveUrl: null,
    aztuesArticleUrl:
      "https://aztues.bg/hack-30xtues-%d0%b3%d0%be%d0%b4%d0%b8%d1%88%d0%bd%d0%b8%d0%bd%d0%b0%d1%82%d0%b0/",
    font: null,
    themeStyle: {
      "--background": "var(--brand-foreground)",
      "--foreground": "0, 0%, 100%",
      "--primary": "var(--brand)",
      "--primary-foreground": "var(--brand-foreground)",
      "--brand": "174 100% 50%",
      "--brand-foreground": "0 0% 7%",
      "--card": "var(--brand)",
      "--card-foreground": "0 0% 100%",
    },
    colorClasses: "bg-background",
    background: HT4Background,
  },
  {
    id: "hacktues-365",
    name: "Hack TUES 365",
    logo: (
      <HTLogo className="text-[#d6c6ad]">
        Hack{" "}
        <span className="text-[#99d02b]">
          TUES<sup>^365</sup>
        </span>
      </HTLogo>
    ),
    startDate: new Date(2019, MARCH, 15),
    endDate: new Date(2019, MARCH, 17),
    location: "ТУЕС",
    format: "присъствен",
    winners: [
      {
        place: "first",
        participants: ["Виктор Велев", "Петър Герасимов", "Теодор Станишев"],
        name: "Elsyser",
        project: {
          name: "VoiceCV",
          description:
            "вградено устройство (в шапка или очила) с камера и изкуствен интелект в помощ на незрящите хора - играе ролята на личен асистент, който информира с глас за околните обекти чрез снимки в близка и далечна перспектива",
        },
        image:
          "https://hacktues.pythonanywhere.com/static/frontend/ht365-1.jpg",
        extraSpecialPrizes:
          "специални награди на „ScaleFocus“, „Дроксик“ и „Data Science Society“",
      },
      {
        place: "second",
        participants: [
          "Владислав Георгиев",
          "Мартин Дацев",
          "Антонио Милев",
          "Телерик Арсов",
        ],
        name: "Какводой",
        project: {
          name: "GeoSolver",
          description:
            "приложение за решаване на геометрични задачи, което сканира условието и генерира електронен чертеж и решение на задачата",
        },
        image:
          "https://hacktues.pythonanywhere.com/static/frontend/ht365-2.jpg",
        extraSpecialPrizes: "специална награда от „Data Science Society“",
      },
      {
        place: "third",
        participants: [
          "Мартин Йорданов",
          "Самуил Георгиев",
          "Антон Янчев",
          "Огнян Барух",
          "Георги Любенов",
        ],
        name: "Babba4e",
        project: {
          name: "Product Chain",
          description:
            "система за проверка на автентичността на продукти чрез сканиране на уникален QR код на всеки продукт, който дава информация за пътя на продукта, използваща блокчейн технология, за да предпази потребителите от фалшиви стоки на пазара",
        },
        image:
          "https://hacktues.pythonanywhere.com/static/frontend/ht365-3.jpg",
        extraSpecialPrizes: "специална награда от „TelebidPro“",
      },
    ],
    stats: {
      participants: 198,
      teams: 43,
      awardedTeams: 10,
    },
    theme: "Полза на ежедневната работа на бизнеса и живота на хората",
    specialPrizes: [
      {
        team: "Телефона в сака",
        project: {
          name: "S.P.A.S. (Smart Personal Assistant System)",
          description:
            "система за отдалечено управление на устройства в дома или офиса през мобилен телефон",
        },
        prize:
          "специална награда за проект с вградена микрокомпютърна технология от „Комет Електроникс“",
        participants: [
          "Искрен Александров",
          "Ангел Стоянов",
          "Мартин Вайер",
          "Мартин Георгиев",
          "Денис Захариев",
        ],
      },
    ],
    description: (
      <>
        <p>
          Петия ученически хакатон HackTUES 365 на ТУЕС ТУ – София се проведе
          през пролетта на 2019 г. в ТУЕС и в София Тех Парк. Общо девет проекта
          спечелиха специални награди в тазгодишното издание на HackTUES. Над 60
          ИТ професионалисти от различни компании, много от които възпитаници на
          училището, бяха ментори и членове на журито. Хакатонът се организира
          от екип от доброволци от 11 клас с подкрепата на Асоциацията на
          завършилите ТУЕС и ръководството на ТУЕС. За поредна година водещи
          технологични компании подкрепиха провеждането на ученическото ИТ
          състезание. Това са „SAP“, „SoftServe“, „TelebidPro“, „VMware“,
          „Droxic“, „Progress“, „ScaleFocus“, „Astea Solutions“, „DevriX“,
          „Dopamine“, „Nemetschek Bulgaria“. Технологични партньори на събитието
          бяха „София Тех Парк“, „Комет Електроникс“, „Смартком - България“,
          „Булгед“, „Cloud Balkan“, „Data Science Society“ и „init Lab“.
          Кетъринг партньори на хакатона бяха „CoKitchen“, „Aristeon.bg“,
          „Delishu“, „Domino’s“, „Пекарчето на татко“, „Pura Vida Organic Farm“,
          „Pure Water“, „Работилничка за сладки моменти“ и сладкар Ирина
          Иванова. Събитието беше подкрепено и от „Ротари Клуб София Капитал“,
          „DevStyler“ и „YoungArtist“.
        </p>
        <p>
          „Учениците от ТУЕС отново доказаха, че за тях няма неосъществими
          идеи.“ – каза доц. д-р инж. Стела Стефанова, директор на Технологично
          училище „Електронни системи“ към ТУ - София. „Журито и
          професионалистите са силно впечатлени от факта, че в хакатона се
          разработват проекти, използващи най-новите технологии. В последните
          години силно впечатление правят решения с невронни мрежи и изкуствен
          интелект, проекти с вградени микрокомпютърни системи и IoT, а ето че
          тази година има и проект с блокчейн технология. Надяваме се, че всяка
          следваща година конкуренцията между отборите ще става още по-голяма и
          новите технологии ще са част от HackTUES“. Преобладаващата част от
          проектите – финалисти в HackTUES 365 комбинират софтуерни, мрежови и
          хардуерни решения.
        </p>
        <p>
          Членовете на отбора победител „Elsyser“ също спечелиха хакатона на
          Студентския клуб на Американския университет в България и са носители
          на различни отличия от други хакатони за професионалисти. Част от
          членовете на отбора, заел второ място „Какводой“, са
          най-награждаваната група ученици в историята на HackTUES, като
          неизменно са сред лауреатите на хакатона
        </p>
      </>
    ),
    websiteArchiveUrl: null,
    aztuesArticleUrl:
      "https://aztues.bg/hack-tues-365-%d0%be%d0%b1%d0%b5%d0%b4%d0%b8%d0%bd%d0%b5%d0%bd%d0%b8%d0%b5%d1%82%d0%be-%d0%bf%d1%80%d0%b0%d0%b2%d0%b8-%d1%81%d0%b8%d0%bb%d0%b0%d1%82%d0%b0/",
    font: null,
    themeStyle: {
      "--background": "var(--brand-foreground)",
      "--foreground": "37 33% 86%",
      "--primary": "var(--brand)",
      "--primary-foreground": "var(--brand-foreground)",
      "--brand": "80 66% 49%",
      "--brand-foreground": "345 6% 13%",
      "--card": "80 66% 69%",
      "--card-foreground": "0 0% 100%",
    },
    colorClasses: "bg-background",
    background: HT5Background,
  },
  {
    id: "hacktues-6",
    name: "Hack TUES 6",
    logo: (
      <HTLogo className="text-white">
        Hack <span className="text-[#fdad20]">TUES</span> 6
      </HTLogo>
    ),
    startDate: new Date(2020, OCTOBER, 1),
    endDate: new Date(2020, OCTOBER, 10),
    location: "София Тех Парк",
    format: "хибриден",
    winners: [
      {
        place: "first",
        participants: [
          "Ангел Пенчев",
          "Симеон Георгиев",
          "Боян Иванов",
          "Богдан Миронов",
          "Мирослав Мирчев",
        ],

        name: "FAnton",
        project: {
          name: "DRUN",
          description:
            "автоматизирана система за доставка на пратки с дронове.",
        },
        image: "/Archive/ht6-1.jpg",
      },
      {
        place: "second",
        participants: [
          "Илиана Генова",
          "Венелин Атанасов",
          "Боряна Стефанова",
          "Стефан Антонов",
          "Иваело Кръстев",
        ],

        name: "789",
        project: {
          name: "Пейо",
          description:
            "преработено радио на около 60 години, така че да използва нови технологии",
        },
        image: "/Archive/ht6-2.jpg",
      },
      {
        place: "third",
        participants: [
          "Анета Цветкова",
          "Калин Дойчев",
          "Костадин Костадинов",
          "Евгени Димов",
        ],

        name: "Нишки",
        project: {
          name: "NotInfo",
          description:
            "браузър разширение за Chrome, коeто следи дали съдържание, което човек чете не е пропаганда.",
        },
        image: "/Archive/ht6-3.jpg",
      },
    ],
    stats: {
      participants: 125,
      teams: 29,
      awardedTeams: 15,
    },
    theme: "Smart City",
    description: (
      <>
        <p>
          Специалната награда за най-добър проект с вградена микрокомпютърна
          технология получи Smart Water Meter - съвременен водомер с дисплей,
          отчитащ моментното и месечното потребление на водата. Проектът е
          разработен от Александър Иванов, Иван Георгиев и Васил Колев от 9
          клас, отбор „C--“. Наградата е осигурена от Комет Електроникс.
          Заместник-кметът на София, д-р Дончо Барбалов връчи две специални
          награди от името на Асоциация за развитие на София - на отбор „Лек
          живот“ от 11 клас за проекта им Bus Locator (мобилно приложение, което
          помага на незрящите в градския транспорт), както и на отбор
          „Segmentation Fault“ за разработеното от тях мобилно приложение
          Walkly, което подтиква хората да се придвиждат пеша, вместо да
          използват автомобилите си. За пръв път тази година се връчиха
          специални награди на отбор, за „Любим проект на публиката“ и за
          „Изгряващи звезди“ за най-добра разработка на ученици от 9 клас.
          Отборите „789“ и отбор „Нишки“ от ученици съответно от 10, 12 клас и
          випуск 2020 на ТУЕС, бяха отличени за най-добра презентация, отличието
          за любим проект отиде при отбор „Холдинга“ с разработката на учениците
          от 12 клас - Covid Tracker - мобилно приложение, което помага на
          хората да разберат дали са заразени преди да забележат симптоми.
          Изгряващите звезди, които спечелиха наградата за най-добър проект от 9
          клас, са Симеон Йорданов, Мартин Божилов, Ясен Ангелов, Матей
          Захариев, Калоян Дойчинов от отбор „AyyMD Tech Tips“, с проекта си
          Techary, уеб платформа, която обединява всичко добро от всяка социална
          медия на едно място. Първата за историята на хакатона награда
          „Най-добър ментор“ получиха Владимир Гаристов от ТУЕС, Марин Дацев от
          TelebidPro и Боян Георгиев от Experian. Самите те са ИТ специалисти,
          които посветиха много време и ентусиазъм, за да дават насоки на
          ученическите отбори в реализирането на идеите им. Отличието връчи
          Огнян Траянов, председател в управителния съвет на БАИТ, който награди
          менторите с ваучер за курс по киберсигурност. Проектът на отбор „Лек
          живот“ от 11 клас - Bus Locator спечели също специалната награда на
          TelebidPro и Progress. Той представлява мобилно приложение, което
          помага на незрящите в градския транспорт. Специалната награда на SAP
          получиха отбор „Someone has to be last“ от 9 клас с проект за
          виртуално изобразяване на високотехнологичен дом. Отбор „По жицата у
          Вили“ от 11 клас бяха отличени от VMware Bulgaria и Creative Assembly
          Sofia за проекта си ChaingeVote - система за електронно гласуване на
          базата на Blockchain технология. Отбор „CyberWave“ от 11 клас получи
          специалната награда на Astea Solutions. Проектът им CovidNews
          представлява уеб платформа, която дава информация за Covid-19 в
          България. Проектът на отбор „Пържени картофи със сирене“ от 10 клас за
          проект SISC - „смарт“ охранителна камера получи наградата на DevriX.
        </p>
        <p>
          Проектът „Светофар!“ - Smart City игра, в която трябва да се менажира
          трафика в града, на отбор „Име на отбора“ от 9 клас беше отличен със
          специалната награда на Dopamine и Creative Assembly Sofia. Отбор
          „TheyGlowInTheDark“ с проекта си Exogen Breach беше отличен със
          специалната награда на Ubisoft Sofia. Проектът представлява игра, в
          която играчът е нашественик - коронавирус в затвор - тялото на човека.
          Състезанието се проведе в хибриден формат в първите два уикенда м.
          октомври. Отборите работеха по проектите си дистанционно, а финалът на
          състезанието и церемонията по награждаването се състояха в София Тех
          Парк при спазване на противоепидемичните мерки от 2020 г. 30 ИТ
          професионалисти бяха ментори и членове на журито. За поредна година
          водещи технологични компании подкрепиха провеждането на ученическото
          ИТ състезание Hack TUES 6. Това бяха Experian, SAP, TelebidPro, VMware
          Bulgaria, Astea Solutions, Kaufland IT Hub, Progress, CPD Ltd.,
          Bosch.IO, Creative Assembly Sofia, DevriX, Dopamine, Ubisoft Sofia.
          Партньори на събитието тази година бяха Асоциация за развитие на
          София, Bulged, Domino’s, COMET ELECTRONICS, Cloud Balkan, Galactic
          Banitsa, init Lab, Компютърна академия IT Step, Ora, Pure Water,
          Smartcom - Bulgaria AD, Sofia Tech Park и Telelink Business Services.
          Медиен партньор на събитието беше DevStyleR.
        </p>
        <blockquote>
          <p>
            „Шестото издание на ученическия хакатон ни показа две много важни
            неща - учениците работят все по-ентусиазирано и това се вижда от все
            по-интересните проекти. И второ, приемствеността между поколенията
            става все по-голяма - виждаме как големите учат малките като ментори
            и като организатори. Надеждата е в младите хора - тези младежи,
            които са сред нас и които ще градят ИТ бъдещето на България. Аз ги
            поздравявам за техните успехи и се радвам, че нашата инвестиция в
            тяхното образование ще бъде оправдана многократно.“
          </p>
          <footer>- доц. д-р инж. Стела Стефанова, директор на ТУЕС</footer>
        </blockquote>
      </>
    ),
    websiteArchiveUrl: "https://6.hacktues.bg/",
    aztuesArticleUrl:
      "https://aztues.bg/hack-tues-6-%d1%8f%d0%b4%d1%80%d0%b5%d0%bd%d0%b8%d1%82%d0%b5-%d0%be%d1%80%d0%b3%d0%b0%d0%bd%d0%b8%d0%b7%d0%b0%d1%82%d0%be%d1%80%d0%b8-%d0%bd%d0%b0-%d0%be%d0%bd%d0%bb%d0%b0%d0%b9%d0%bd-%d1%81%d1%8a/",
    font: roboto.style,
    themeStyle: {
      "--background": "254 28% 17%",
      "--foreground": "0 0% 100%",
      "--primary": "var(--brand)",
      "--primary-foreground": "var(--brand-foreground)",
      "--brand": "38 98% 56%",
      "--brand-foreground": "var(--background)",
      "--card": "38 98% 86%",
      "--card-foreground": "0 0% 100%",
      "--radius": "2rem",
    },
    colorClasses: "bg-gradient-to-b from-background to-[#ce402c]",
    background: HT6Background,
  },
  {
    id: "hacktues-gg",
    name: "Hack TUES GG",
    logo: (
      <HTLogo>
        <span className="text-[#009d60]">Hack TUES</span>{" "}
        <span className="text-[#105231]">GG</span>
      </HTLogo>
    ),
    startDate: new Date(2021, MARCH, 11),
    endDate: new Date(2021, MARCH, 14),
    location: null,
    format: "онлайн",
    winners: [
      {
        place: "first",
        participants: [
          "Виктор Горчилов",
          "Валентин Спасов",
          "Самуил Георгиев",
          "Антон Янчев",
        ],
        name: "Holdinga",
        project: {
          name: "CyclePath",
          description:
            "recommendation engine за маршрути за велосипедисти на база на фактори като замърсяване на въздуха, оценяване от други и дистанция до крайната точка. Изработва се с Graph DB, NestJS и React.",
        },
        image: "/Archive/ht7-1.jpg",
      },
      {
        place: "second",
        participants: [
          "Александър Найденов",
          "Стефан Босев",
          "Стоян Тинчев",
          "Кристиян Стоименов",
        ],
        name: "Мечо пух",
        project: {
          name: "Verda",
          description:
            "a chatbot that helps you understand and react appropiately to the the problems which surround us. How can Verda help us? The amount of precious resources that our planet provides us are declining daily - and all of that is our own fault. Deforestation, biodiversity loss and plastic pollution are only a small portion of the global disaster. Living our lives without complying to the nature's laws is not doing us any good and we have to find a way to change this. Thus, our idea - Verda. A chatbot, which gives you information about matured problems and alternative solutions to them",
        },
        image: "/Archive/ht7-2.jpg",
      },
      {
        place: "third",
        participants: [
          "Ангел Стоянов",
          "Лилия Любенова",
          "Евгени Атанасов",
          "Денис Захариев",
        ],
        name: "Dynamics",
        project: {
          name: "GRobot",
          description:
            "робот, който се придвижва и на базата на изкуствен интелект, разпознава отпадъци и ги събира. GRobot разполага с камера, която е свързана към микрокомпютър, който стриймва видео към сървър. YOLO v4 определя вида на боклука от стрийма, след което роботизирана щипка го взима и го поставя в тялото на робота - контейнер.",
        },
        image: "/Archive/ht7-3.jpg",
      },
    ],
    stats: {
      participants: 193,
      teams: 43,
      awardedTeams: 30,
    },
    theme: "Develop for the environment",
    description: (
      <>
        <p>
          За първи път училищния хакатон се проведе изцяло онлайн през 2021 г.
          със седмото си издание - Hack TUES GG. Както винаги 43-те отбора имаха
          малко над 48 ч. да направят своите проекти по темата на хакатона -
          „Develop for the environment”, свързана със зелените технологии и
          опазването на околната среда. Подтемите бяха Code red - свързана с
          борбата с глобалното затопляне и вредните емисии, Deep in the blue -
          свързана с опазването на водите от замърсяване, Browny soil - свързана
          с опазване на почвите от замърсяване, Pallete Nature - цели
          популяризирането на рециклирането, втората употреба и предпазването на
          биоразнообразието.
        </p>
      </>
    ),
    websiteArchiveUrl: "https://gg.hacktues.bg/",
    aztuesArticleUrl: "https://aztues.bg/aztues-hack-tues-hacktuesgg/",
    font: rubik.style,
    themeStyle: {
      "--background": "43 64% 92%",
      "--foreground": "150 67% 19%",
      "--primary": "var(--brand)",
      "--primary-foreground": "var(--brand-foreground)",
      "--brand": "157 100% 31%",
      "--brand-foreground": "0 0% 100%",
      "--card": "var(--brand)",
      "--card-foreground": "var(--foreground)",
      "--secondary": "var(--brand)",
      "--secondary-foreground": "var(--foreground)",
      "--ring": "var(--brand)",
    },
    colorClasses: "bg-background",
    background: HT7Background,
  },
  {
    id: "hacktues-infinity",
    name: "Hack TUES Infinity",
    logo: <HTLogo className="text-[#f7b7d3]">Hack TUES ∞</HTLogo>,
    startDate: new Date(2022, MARCH, 10),
    endDate: new Date(2022, MARCH, 13),
    location: null,
    format: "онлайн",
    winners: [
      {
        place: "first",
        participants: [
          "Виолета Кабаджова",
          "Захари Момчилов",
          "Кристиян Стоименов",
          "Мартин Вайер",
          "Стоян Тинчев",
        ],
        name: "Лемнискåта",
        project: {
          description:
            "система, която оценява вероятността за успешно кацане върху космичен терен.",
        },
        image: "/Archive/ht8-1.jpg",
      },
      {
        place: "second",
        participants: [
          "Николай Лазаров",
          "Християн Радев",
          "Йосиф Хамед",
          "Йоан Джелегарски",
        ],
        name: "Котки с палци",
        project: {
          name: "СПИМ",
          description:
            "система за подпомагане изследването на Марс. Системата съдържа няколко компонента – главни станции, които следят условията на планетата и по – малки джобни устройства, които известяват астронавтите при отклонения от нормите.",
        },
        image: "/Archive/ht8-2.jpg",
      },
      {
        place: "third",
        participants: [
          "Йоан Иванов",
          "Живко Нушев",
          "Димитър Димитров",
          "Георги Фиданов",
          "Радослав Филипов",
        ],
        name: "TtT",
        project: {
          name: "TtT pager",
          description:
            "система от пейджъри, които помагат да се премине езиковата бариера на Международната космическа станция",
        },
        image: "/Archive/ht8-3.jpg",
      },
    ],
    stats: {
      participants: 224,
      teams: 50,
      awardedTeams: 20,
    },
    theme: "Space for everybody",
    description: (
      <>
        <p>
          На 10 март 2022 година, бе даден стартът на осмото издание на Hack
          TUES, след шест месечен труд по планирането и организирането му.
          Тринадесет членния екип бе напълно подготвен да даде подобаващ старт
          на тазгодишното издание на емблематичното за ТУЕС и ТУЕС общността
          събитие.
        </p>
      </>
    ),
    websiteArchiveUrl: "https://infinity.hacktues.bg/",
    aztuesArticleUrl: "https://aztues.bg/hack-tues-infinity/",
    font: comfortaa.style,
    themeStyle: {
      "--background": "261 57% 21%",
      "--foreground": "0 0% 100%",
      "--primary": "var(--brand)",
      "--primary-foreground": "var(--brand-foreground)",
      "--brand": "334 80% 84%",
      "--brand-foreground": "261 57% 15%",
      "--card": "var(--brand)",
      "--card-foreground": "0 0% 100%",
    },
    colorClasses: "bg-background text-foreground",
    background: HT8Background,
  },
  {
    id: "hacktues-security",
    name: "Hack TUES S",
    logo: (
      <HTLogo className="text-[#29838e]">
        <span className="text-[#a01824]">Hack</span> TUES{" "}
        <span className="text-[#a01824]" style={htSecurityFont.style}>
          S
        </span>
      </HTLogo>
    ),
    startDate: new Date(2023, MARCH, 8),
    endDate: new Date(2023, MARCH, 11),
    location: "София Тех Парк",
    format: "присъствен",
    winners: [
      {
        place: "first",
        participants: [
          "Данаил Йорданов",
          "Християн Радев",
          "Калоян Георгиев",
          "Искрен Александров",
          "Лъчезар Топалов",
        ],
        name: "4090",
        project: {
          name: "PhishMe",
          description:
            "система за генериране на phishing атаки вътрешно в дадена организация, която има възможност да имитира речта на конкретни лица от организацията на 2 нива на разговор – официален и неофициален, както и на различни теми, посредством модел за обработка на естествени езици и анализ на предходна комуникация. PhishMe включва дубликатор на статични и динамични уеб приложения с цел фалшификация на формуляри за събиране на данни, динамично редактиране на  и статистика за изпратените и успешните атаки. Целта е вътрешна оценка на подготовката на служителите за справяне с phishing атаки с цел превенция на изтичане на конфиденциални данни както и анализиране на нуждата от обучение.",
        },
        image: "/Archive/ht9-1.jpg",
      },
      {
        place: "second",
        participants: [
          "Божидар Павлов",
          "Калоян Миладинов",
          "Никола Сачков",
          "Денис Мирчев",
        ],
        name: "False Positive", // winner pov
        project: {
          name: "Beware",
          description:
            "уеб приложение, което поставя потребителя на мястото на хакер, успял да влезе в чужд компютър. Целта му е да изпълни серия от задачи, например да открадне паролата за имейла на собственика на лаптопа, за да разбере какво може да се случи и с неговия компютър, ако не защитава данните си достатъчно добре. Всяка такава задача завършва със страница за изводи.",
        },
        image: "/Archive/ht9-2.jpg",
      },
      {
        place: "third",
        participants: [
          "Никола Керезов",
          "Крум Стефанов",
          "Симеон Ангелов",
          "Кристиян Богданов",
          "Алеко Георгиев",
        ],
        name: "Баладжинатор",
        project: {
          name: "RoadHaze",
          description:
            "проект, който дава в реално време състоянието на пътната настилка по пътищата.",
        },
        image: "/Archive/ht9-3.jpg",
      },
    ],
    stats: {
      participants: 281,
      teams: 63,
      awardedTeams: 20,
    },
    theme: "Security",
    description: (
      <>
        <p>
          На 8.03.2023 година бе даден стартът на деветото издание на Hack TUES,
          след шест месечен труд по планирането и организирането му.
          Четиринадесет членния екип бе напълно подготвен да даде подобаващ
          старт на тазгодишното издание на емблематичното за ТУЕС и ТУЕС
          общността събитие.
        </p>
      </>
    ),
    websiteArchiveUrl: null,
    aztuesArticleUrl: "https://aztues.bg/hack-tues-s/",
    font: montserrat.style,
    themeStyle: {
      "--background": "359 83% 16%",
      "--foreground": "0 0% 100%",
      "--primary": "var(--brand)",
      "--primary-foreground": "var(--brand-foreground)",
      "--brand": "187 55% 36%",
      "--brand-foreground": "0 0% 100%",
      "--card": "355 74% 36%",
      "--card-foreground": "0 0% 100%",
    },
    colorClasses:
      "bg-gradient-to-b from-background/50 via-background via-75% to-card/60",
    background: HT1Background,
  },
] as const;

export type Hackathon = (typeof HACKATHONS)[number];
