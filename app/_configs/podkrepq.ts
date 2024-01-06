//Media
import bloombergLogo from "../assets/media/bloomberg.png";
import bnrLogo from "../assets/media/bnr.png";
import capitalLogo from "../assets/media/capital.png";
import devstylerArticleLogo from "../assets/media/devstyler.png";
import investorLogo from "../assets/media/investor.png";
import karieribgLogo from "../assets/media/karieribg.png";
//Media

//Alpha sponsors
import appolicaLogo from "../assets/sponsors/alpha/appolica.png";
import boschECSLogo from "../assets/sponsors/alpha/bosch-engineering-center-sofia.png";
import codbexLogo from "../assets/sponsors/alpha/codbex.png";
//import dxcLogo from "../assets/sponsors/alpha/dxc.png";
import elevenVenturesLogo from "../assets/sponsors/alpha/eleven-ventures.png";
import sapLogo from "../assets/sponsors/alpha/sap.png";
//import tbsLogo from "../assets/sponsors/alpha/tbs.png";
import trading212Logo from "../assets/sponsors/alpha/trading212.png";
//Alpha sponsors

//Beta sponsors
import devrixLogo from "../assets/sponsors/beta/devrix.png";
import experianLogo from "../assets/sponsors/beta/experian.png";
import itGixLogo from "../assets/sponsors/beta/itGix.png";
import stamsoftLogo from "../assets/sponsors/beta/stamsoft.png";
import strypesLogo from "../assets/sponsors/beta/strypes.png";
import telebidProLogo from "../assets/sponsors/beta/telebidPro.png";
import tumbaSolutionsLogo from "../assets/sponsors/beta/tumba-solutions.png";
//Beta sponsors

//Gamma sponsors
import accediaLogo from "../assets/sponsors/gamma/accedia.png";
import asteaSolutionsLogo from "../assets/sponsors/gamma/astea-solutions.png";
import globalFoundriesLogo from "../assets/sponsors/gamma/globalfoundries.png"
import ocadoTechnologyLogo from "../assets/sponsors/gamma/ocado-technology.png";
import progressLogo from "../assets/sponsors/gamma/progress.png";

//Partners
import a1Logo from "../assets/sponsors/alpha/a1.png";
import aztuesLogo from "../assets/sponsors/partners/aztues.png";
import cometLogo from "../assets/sponsors/partners/comet.png";
import corporateLogo from "../assets/sponsors/partners/corporate.png";
import devstylerLogo from "../assets/sponsors/partners/devstyler.png";
import dominosLogo from "../assets/sponsors/partners/dominos.png";
import greenCherryLogo from "../assets/sponsors/partners/green_cherry.png";
import pureWaterLogo from "../assets/sponsors/partners/pure_water.png";
import smartcomLogo from "../assets/sponsors/partners/smartcom.png";
import sofiaTechParkLogo from "../assets/sponsors/partners/sofia-tech-park.png";
//Partners

const ALPHA_SPONSORS = [
  {
    name: "Appolica",
    logo: appolicaLogo,
    url: "https://www.appolica.com/",
    description:
      "Запознайте се с Appolica – наш алфа спонсор и стартъп студио от София, което превръща идеи в реалност! От основаването си в София през 2015 г., компанията е движеща сила зад множество успешни стартъпи. С опит в повече от 30 страни и портфолио от успешни проекти в различни индустрии, Appolica е символ на иновативно мислене. 🚀  Присъединявайки се към Hack TUES X, Appolica носи своята страст и експертиза в света на иновациите.",
    supportedEditions: ["hacktues-security"],
  },
  {
    name: "Bosch Engineering Center Sofia",
    logo: boschECSLogo,
    url: "https://www.bosch.bg/",
    description:
      "В Bosch Engineering Center Sofia се разработват иновативни технологии за автомобилната индустрия в области като системи за помощ на водача, автоматизирано шофиране и електромобилност. Екипът на Инженерния център участва в повече от 70 международни проекта в сътрудничество с развойни екипи от Германия, САЩ, Унгария и Румъния. Центърът се позиционира като ключов партньор със значим принос в световната инженерна мрежа на Bosch.",
  },
  {
    name: "codbex",
    logo: codbexLogo,
    url: "https://www.codbex.com/",
    description:
      "Кодбекс е иновативна и динамична технологична компания, която е специализирана в предоставянето на софтуерни решения на бизнеси в различни индустрии. Ние от Кодбекс предлагаме уникална платформа за проектиране и разработване на индустриални решения, базирани на технологии с отворен код, пригодени да посрещнат развиващите се нужди на съвременния бизнес. Нашите водещи предложения включват усъвършенствани системи за управление на бази данни, надеждни инструменти за интегриране на бизнес процеси и персонализирани софтуерни решения, проектирани да подобрят производителността на бизнеса. Ние от Кодбекс поставяме удовлетвореността на нашите клиенти на първо място - нашият екип се състои от квалифицирани професионалисти и експерти, с поглед към иновациите, които използват най-новите технологии и методологии, за да доставят решения, които надхвърлят очакванията. Стремежът ни е  да бъдем доверен партньор за компании, които искат да използват пълния потенциал на своите активи и да стимулират устойчив успех в една все по-конкурентна дигитална среда.",
  },
  {
    name: "Eleven Ventures",
    logo: elevenVenturesLogo,
    url: "https://www.11.vc/",
    description:
      "Eleven Ventures is one of the leading early-stage VCs in Southeast Europe, investing in startups since 2012. With 150+ collective investments over 11 years, Eleven’s team has been instrumental in catalysing the regional startup ecosystem. Eleven supports tech companies in four priority verticals - Future of Work, Fintech, Healthcare and Sustainable Food. Some of the startups which Eleven has backed include fintech unicorn Payhawk, Gtmhub, Dronamics, and SMSBump. For more information on Eleven Ventures, visit https://www.11.vc/. ",
  },
  {
    name: "SAP Labs България",
    logo: sapLogo,
    url: "https://www.sap.com/bulgaria/",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-6",
      "hacktues-365",
      "hacktues-30x",
      "hacktues-3",
      "hacktues-2",
    ],
    description:
      'Признат като водеща локация и сърце на технологичния хъб на SAP за югоизточна Европа, развойният център SAP Labs България успява да привлече ангажирани професионалисти със силна технологична експертиза и 9 пъти получава отличието „Най-добър работодател“ в България. Синергията между екипи, фокусирани както върху технологичната основа, така и върху бизнес приложенията разработени на нея, допринася за визията на SAP да подпомага трансформацията на своите клиенти към "устойчиви интелигентни предприятия".',
  },
  {
    name: "Trading 212",
    logo: trading212Logo,
    url: "https://www.trading212.com/",
    supportedEditions: ["hacktues-security"],
    description:
      "Trading 212 is a fintech company that democratises the financial markets with free, smart and easy to use apps, enabling anyone to trade Stocks, ETFs, Forex, Commodities, and more. We disrupted the stock brokerage industry by offering the first zero-commission stock trading service in the UK and Europe, unlocking the stock market for millions of people. Our mobile app has more than 15.000.000 downloads, which makes it one of the most popular trading apps in the world. Since 2016, Trading 212’s app has been the UK’s #1 trading app, and in 2017 it reached the #1 spot in Germany.",
  },
];

const BETA_SPONSORS = [
  {
    name: "Devrix",
    logo: devrixLogo,
    url: "https://devrix.com/",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-6",
      "hacktues-365",
    ],
    description:
      "DevriX е една от Топ 20 WordPress Development агенции в света, която подпомага развитието на платформата. Компанията работи по enterprise проекти с над 200М месечен трафик, технологични стартъпи, електронни магазини и други, предоставяйки стабилна платформа за развитие на бизнесите им. Компанията работи по Retainer модел, който позволява на клиентите изцяло да доверят техническите си процеси на доказани WordPress и бизнес експерти. Услугите на DevriX комбинират back-end и front-end разработка с поддръжка на WordPress, DevOps, UX, AdOps, дигитален маркетинг, уеб дизайн и управление на проекти.",
  },
  {
    name: "Experian България",
    logo: experianLogo,
    url: "https://www.experian.bg/",
    description:
      "Ние сме Experian – глобален технологичен лидер в предоставянето на информация и аналитични услуги. Превръщаме информацията в ценни данни и създаваме софтуерни продукти, с които целим да направим бизнеса на нашите клиенти по-успешен, а животът на потребителите – по-добър. В основата на нашия успех стоят иновациите и талантливият ни екип от 21 700 души в 30 държави в света, посветени на мисията да осигурят по-добро финансово здраве и възможности за потребителите, като им помагат да разбират, управляват и защитават своите лични финанси и данни.",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-6",
    ],
  },
  {
    name: "ITGix",
    logo: itGixLogo,
    url: "https://itgix.com/",
    supportedEditions: ["hacktues-security"],
    description:
      "ITGix е сертифициран ISO/ IEC 27001: 2013 доставчик на DevOps услуги с фокус върху автоматизацията, облачната миграция, консултантските дейности и поддръжката. Специализирани сме в контейнеризацията, мониторинга и изграждането на CI/CD интеграции. Работим с клиенти от целия свят, използваме най-новите технологии в IT сектора и се гордеем с успешно завършените си проекти и положителна обратна връзка, която получаваме от клиентите си. Ако мечтаеш за работа, която освен просперитет, да ти носи и удоволетворение, то твоето място е в АйТи Гикс. Целогодишно организираме стажове и се стремим да развиваме хората в екипа си посредством менторски програми, сертифициране и придобиване на практически знания.",
  },
  {
    name: "Stam Soft",
    logo: stamsoftLogo,
    url: "https://www.stamsoft.com/",
    supportedEditions: ["hacktues-security"],
    description:
      "Stam Soft е софтуерна компания с над 10 години опит в разработката на мобилни и уеб приложения и уеб дизайн. През тези години, StamSoft са имали привилегията да работят със забележителни компании от различни точки по света, като Grohe, Changex, TokaCity, Prosieben1,  Steyr Mannlicher и други, създавайки за тях, приложения, с които те успяват да подобрят своето дигитално присъствие.",
  },
  {
    name: "Strypes Group",
    logo: strypesLogo,
    url: "https://strypes.eu/",
    supportedEditions: ["hacktues-security", "hacktues-gg"],
    description:
      "В Strypes Group, екипът ни e на първо място, а работата е вдъхновение. Сплотява ни страстта към иновациите и стремежът постоянно да растем и да покажем на света, че сме различни. Различни със своята култура, отношение към работата и хората, както и с постиженията си в бизнеса и технологичния свят. Ще откриеш мястото си при нас, независимо дали това е първата ти работа в ИТ сферата, или вече имаш дълъг опит зад гърба си.",
  },
  {
    name: "Telebid Pro", //TODO: Replace temp description
    logo: telebidProLogo,
    url: "https://telebid-pro.com/",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-6",
      "hacktues-365",
      "hacktues-30x",
      "hacktues-3",
    ],
    description:
      "Телебид Про е софтуерна продуктово-ориентирана компания, специализирана в разработването на бизнес системи, които изгражда от идея до завършен продукт.",
  },
  {
    name: "Tumba Solutions",
    logo: tumbaSolutionsLogo,
    url: "https://www.tumba.solutions/",
    description:
      "Tumba Solutions е водеща компания в сферата на мобилните технологии. Разработваме висококачествени софтуерни решения в сфери като автономни превозни средства, градска мобилност, издателска, спортна и развлекателна индустрия.",
  },
];

const GAMMA_SPONSORS = [
  {
    name: "Accedia",
    logo: accediaLogo,
    url: "https://accedia.com/",
    description:
      "Accedia e българска технологична компания, предоставяща консултантски услуги и разработка на софтуер и цялостни IT решения. Основана през 2012, за изминалите 10 години компанията става пример за устойчив растеж и е оценена от многобройни клиенти, служители и отличия.  Над 250 човека са обединени около мисията да надскачат очаквания със своите технологични знания и професионално отношение, с това, че виждат промяната като възможност, и с това, че са постоянно ориентирани към учене и израстване. Не на последно място, умението на хората да се забавляват ги прави толкова сплотени и превръща Аксидиа в един от най-желаните работодатели.",
    supportedEditions: ["hacktues-security", "hacktues-30x"],
  },
  {
    name: "Astea Solutions",
    logo: asteaSolutionsLogo,
    url: "https://asteasolutions.com",
    description:
      "AsteaSolutions - експерти в разработката на софтуер и технологични решения! Техният успех се дължи на задружен екип от астейци, които обединяват умения и сили за иновации в различни индустрии и сфери. 💼 Споделят знание и инвестират в образование, защото вярват в младите умове!",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-6",
      "hacktues-365",
      "hacktues-30x",
      "hacktues-3",
    ],
  },
  {
    name: "GlobalFoundries Bulgaria",
    logo: globalFoundriesLogo,
    url: "https://gf.com/",
    description:
      "GlobalFoundries: Българските инженери, които реализират иновации на глобално ниво в дизайна и производството на микрочипове. GlobalFoundries Bulgaria e локалният офис на една от водещите (топ 3) компании в света за производство на микрочипове и играе ключова роля в местната технологична сцена. Компанията намира, обучава и развива инженери чрез своята успешна стажантска програма. Като водещ производител на микрочипове, компанията не само създава технически специалисти в областта на микроелектрониката, но и допринася активно за местната екосистема инвестирайки в партньорства с техническите университети и гимназии в страната.",
    supportedEditions: []
  },
  {
    name: "Ocado Technology",
    logo: ocadoTechnologyLogo,
    url: "https://www.ocadogroup.com/about-us",
    description:
      " Системите и решенията от световна класа на Ocado Technology в областта на автоматизацията, роботиката, изкуствения интелект, машинното обучение, симулацията и големите данни са в основата на онлайн операциите на търговци на хранителни стоки по целия свят. Ocado Smart Platform (OSP) е уникална платформа за електронна търговия и логистика, която дава възможност за устойчива, мащабна и изгодна онлайн доставка на хранителни продукти. Технологиите на компанията задвижват Ocado.com и Morrisons.com, Voila.ca и хранителни стоки на Monoprix.fr, Sobeys, Casino. Скоро ще стоят и зад още онлайн търговски марки в целия свят: от Европа и Северна Америка, до Австралия и Азия. Ocado Technology продължава да създава иновации всеки ден, използвайки своите уникални технологии, компетенции, IP и ноу-хау за трансформиране на онлайн търговията с хранителни стоки и не само.",
    supportedEditions: ["hacktues-infinity"],
  },
  {
    name: "Progress",
    logo: progressLogo,
    url: "https://www.progress.com/",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-6",
      "hacktues-365",
    ],
    description:
      "В София се намира най-големият офис на Progress и в него се разработват голяма част от иновациите – изцяло нови продукти и в съществуващи продукти – които компанията пуска на пазара. Сред тях са платформата за дигитални преживявания Progress Sitefinity и водещите инструменти за разработчици Progress Telerik и Progress Kendo UI. Зад успеха на продуктите стои високият професионализъм, експертност и мотивация на хората, които работят в Progress.Работната среда е базирана на доверие, уважение и работа в екип и насърчава свободното споделяне на идеи и развитието на хората.",
  },
];

const PARTNERS = [
  {
    name: "A1",
    logo: a1Logo,
    url: "https://www.a1.bg/",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
    ],
    description:
      "А1 е водещ доставчик на дигитални услуги и телекомуникационни решения в България. Част сме от A1 Group, която оперира в 7 държави в Централна и Източна Европа, и América Móvil – един от най-големите доставчици на безжични услуги в света. А1 България е най-големият системен интегратор и най-голямата ICT компания в страната, както и лидер на пазара на телекомуникационни услуги по приходи, според класацията Digitalk 101. Ние сме компания, която си поставя високи цели и не се бои да ги изпълни. Работим в международен екип и споделяме наученото с всички компании в A1 Group. В екипа ни работят повече от 3600 професионалисти в различни направления. Разполагаме със сертификата Great Place To Work, който ни определя като един от най-добрите работодатели в Европа. Грижим се за своите служители, като в наше лице те виждат стабилна и бързоразвиваща се компания, която им предоставя възможности за развитие.",
  },
  {
    name: "AZTUES",
    logo: aztuesLogo,
    url: "https://aztues.bg/",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-6",
      "hacktues-365",
      "hacktues-30x",
      "hacktues-3",
    ],
    description:
      'Асоциацията на завършилите ТУЕС е неправителствена организация, която има за цел да обедини и подпомага общността от завършили и настоящи ученици в Технологично училище "Електронни Системи" към ТУ - София (ТУЕС), преподаватели и приятели на училището. Учредена е през декември 2014 и работи активно от средата на 2015, като вече наброява над 1,000 членове и се е превърнала в двигател на редица събития и инициативи, ключови за ТУЕС общността.',
  },
  // {
  //   name: "Comet Electronics",
  //   logo: cometLogo,
  //   url: "https://comet.bg/",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  // },
  {
    name: "Corporate Gifts",
    logo: corporateLogo,
    url: "https://corporategifts.bg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Dominos",
    logo: dominosLogo,
    url: "https://dominos.bg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Smartcom",
    logo: smartcomLogo,
    url: "https://smartcom.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Sofia Tech Park",
    logo: sofiaTechParkLogo,
    url: "https://sofiatech.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export { ALPHA_SPONSORS, BETA_SPONSORS, GAMMA_SPONSORS, PARTNERS };

export type Podkrepqsht =
  | (typeof ALPHA_SPONSORS)[number]
  | (typeof BETA_SPONSORS)[number]
  | (typeof GAMMA_SPONSORS)[number]
  | (typeof PARTNERS)[number];

export const MEDIA_ARTICLES = [
  {
    name: "DevStyler",
    title: "Проведе се Деветото Издание на Hack TUES 9",
    logo: devstylerArticleLogo,
    url: "https://devstyler.bg/blog/2023/03/13/provede-se-devetoto-izdanie-na-hack-tues-9/",
    date: new Date(2023, 11, 9),
  },
  {
    name: "Кариери.bg",
    title:
      "Ученици по технологии ще работят с експерти от 30 ИТ компании на HackTUES",
    logo: karieribgLogo,
    url: "https://www.karieri.bg/news/40146_uchenici-po-tehnologii-shche-rabotyat-s-eksperti-ot-30",
    date: new Date(2023, 11, 9),
  },
  {
    name: "БНР",
    title: "224 ученици и 25 фирми участват в осмия хакатон на ТУЕС",
    logo: bnrLogo,
    url: "https://bnr.bg/sofia/post/101613996/tues",
    date: new Date(2023, 11, 9),
  },
  {
    name: "Столица.bg",
    title: "Започна осмият хакатон на Технологично училище в София",
    logo: capitalLogo,
    url: "https://stolica.bg/sofia/zapochna-osmiyat-hakaton-na-tehnologichno-uchilishte-v-sofiya",
    date: new Date(2023, 11, 9),
  },
  {
    name: "Investor.BG",
    title:
      "Знания и талант ще демонстрират ученици в осмото издание на хакатона HackTUES",
    logo: investorLogo,
    url: "https://www.investor.bg/a/261-novini/347522-znaniya-i-talant-shte-demonstrirat-uchenitsi-v-osmoto-izdanie-na-hakatona-hacktues",
    date: new Date(2023, 11, 9),
  },
  {
    name: "Bloomberg TV Bulgaria",
    title:
      "Ученици демонстрират знания и талант в осмото издание на хакатона HackTUES",
    logo: bloombergLogo,
    url: "https://www.bloombergtv.bg/a/16-biznes-start/104120-uchenitsi-demonstrirat-znaniya-i-talant-osmoto-izdanie-na-hakatona-hacktues",
    date: new Date(2023, 11, 9),
  },
];

export type MediaArticle = (typeof MEDIA_ARTICLES)[number];
