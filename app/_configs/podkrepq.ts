import bloombergLogo from "../assets/media/bloomberg.png";
import bnrLogo from "../assets/media/bnr.png";
import capitalLogo from "../assets/media/capital.png";
import investorLogo from "../assets/media/investor.png";
import karieribgLogo from "../assets/media/karieribg.png";
//Partners
import a1Logo from "../assets/sponsors/alpha/a1.png";
//Alpha sponsors
import appolicaLogo from "../assets/sponsors/alpha/appolica.png";
import boschECSLogo from "../assets/sponsors/alpha/bosch-engineering-center-sofia.png";
import codbexLogo from "../assets/sponsors/alpha/codbex-orange-logo.png";
import dxcLogo from "../assets/sponsors/alpha/dxc.png";
import elevenVenturesLogo from "../assets/sponsors/alpha/eleven-ventures.png";
import limeChainLogo from "../assets/sponsors/alpha/limechain.png";
import sapLogo from "../assets/sponsors/alpha/sap.png";
import stenikLogo from "../assets/sponsors/alpha/stenik.png";
import tbsLogo from "../assets/sponsors/alpha/tbs.png";
import trading212Logo from "../assets/sponsors/alpha/trading212.png";
//Alpha sponsors
//Beta sponsors
import chaosLogo from "../assets/sponsors/beta/chaos1.png";
import devrixLogo from "../assets/sponsors/beta/devrix.png";
import experianLogo from "../assets/sponsors/beta/experian.png";
import extremeLabsLogo from "../assets/sponsors/beta/extremeLabs.png";
import haemimontLogo from "../assets/sponsors/beta/haemimont.png";
import itGixLogo from "../assets/sponsors/beta/itGix.png";
import sirmaLogo from "../assets/sponsors/beta/sirma.png";
import stamsoftLogo from "../assets/sponsors/beta/stamsoft.png";
import strypesLogo from "../assets/sponsors/beta/strypes.png";
import telebidProLogo from "../assets/sponsors/beta/telebidPro.png";
import tumbaSolutionsLogo from "../assets/sponsors/beta/tumba-solutions.png";
//Beta sponsors

//Gamma sponsors
import accediaLogo from "../assets/sponsors/gamma/accedia.png";
import asteaSolutionsLogo from "../assets/sponsors/gamma/astea-solutions.png";
import dreamixLogo from "../assets/sponsors/gamma/dreamix.png";
import dynamoSoftwareLogo from "../assets/sponsors/gamma/dynamo-software.png";
import globalFoundriesLogo from "../assets/sponsors/gamma/globalfoundries.png";
import nemetschekLogo from "../assets/sponsors/gamma/nemetschek.png";
import ocadoTechnologyLogo from "../assets/sponsors/gamma/ocado-technology.png";
import progressLogo from "../assets/sponsors/gamma/progress.png";
//Media partners
import btvLogo from "../assets/sponsors/media-partners/btv.webp";
import darikBusinessReviewLogo from "../assets/sponsors/media-partners/dbr.webp";
import devstylerLogo from "../assets/sponsors/media-partners/devstyler.webp";
import economyBgLogo from "../assets/sponsors/media-partners/economy-bg.webp";
import inzhenerBgLogo from "../assets/sponsors/media-partners/inzhener-bg.webp";
import kaldataLogo from "../assets/sponsors/media-partners/kaldata.webp";
import managerLogo from "../assets/sponsors/media-partners/manager.png";
import obektiBgLogo from "../assets/sponsors/media-partners/obekti.jpg";
//Gamma sponsors
//Partners
import aztuesLogo from "../assets/sponsors/partners/aztues.png";
import boniLogo from "../assets/sponsors/partners/boni.png";
import corporateLogo from "../assets/sponsors/partners/corporate.png";
import culligan from "../assets/sponsors/partners/culligan.jpg";
import dominosLogo from "../assets/sponsors/partners/dominos.png";
import remoLogo from "../assets/sponsors/partners/remo-mebeli.png";
import smartcomLogo from "../assets/sponsors/partners/smartcom.png";
import sofiaTechParkLogo from "../assets/sponsors/partners/sofia-tech-park.png";
//Media partners

import { FEBRUARY, JANUARY, MARCH } from "../utils";

const ALPHA_SPONSORS = [
  {
    name: "Appolica",
    logo: appolicaLogo,
    url: "https://www.appolica.com/",
    description:
      "Запознайте се с Appolica – наш алфа спонсор и стартъп студио от София, което превръща идеи в реалност! От основаването си в София през 2015 г., компанията е движеща сила зад множество успешни стартъпи. С опит в повече от 30 страни и портфолио от успешни проекти в различни индустрии, Appolica е символ на иновативно мислене. Присъединявайки се към Hack TUES X, Appolica носи своята страст и експертиза в света на иновациите.",
    supportedEditions: ["hacktues-security", "hacktues-infinity"],
  },
  {
    name: "Bosch Engineering Center Sofia",
    logo: boschECSLogo,
    url: "https://www.bosch.bg/ecs",
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
    name: "DXC Technology Bulgaria",
    logo: dxcLogo,
    url: "https://dxc.com/bg/en",
    description:
      "DXC Technology е глобален лидер в предоставянето на цялостни IT решения. Мисията ни е да използваме силата на технологиите, за да изградим по-добро бъдеще за нашите клиенти, колеги, общности и околна среда. Имаме повече от 130 000 служители в над 70 страни, а в България сме сред най-големите работодатели с повече от 4000 колеги, работещи от различни части на страната. Тук е представено цялото IT портфолио на компанията - техническа поддръжка, анализ на големи масиви от данни, облачни технологии, разработване на системи за автономни автомобили, мрежи, киберсигурност, разработване на приложения и софтуери с Java, .Net, C++ и много други. Това, в което сме сред най-добрите, е да помагаме на бизнеси и правителства по целия свят да трансформират дейността си и да извлекат максимална добавена стойност от новите технологии.",
    supportedEditions: ["hacktues-security"],
  },
  {
    name: "Eleven Ventures",
    logo: elevenVenturesLogo,
    url: "https://www.11.vc/",
    description:
      "Eleven Ventures is one of the leading early-stage VCs in Southeast Europe, investing in startups since 2012. With 150+ collective investments over 11 years, Eleven’s team has been instrumental in catalysing the regional startup ecosystem. Eleven supports tech companies in four priority verticals - Future of Work, Fintech, Healthcare and Sustainable Food. Some of the startups which Eleven has backed include fintech unicorn Payhawk, Gtmhub, Dronamics, and SMSBump. For more information on Eleven Ventures, visit https://www.11.vc/. ",
  },
  {
    name: "LimeChain",
    logo: limeChainLogo,
    url: "https://limechain.tech/",
    description:
      "LimeChain is a global leader in Web3 development and innovation, working with Fortune 500 clients and Web3 startups. We’re experts in crafting dApps, blockchain networks, and enterprise solutions using the latest Web3 technologies. With over 200 projects under our belt and a team of more than 120 industry experts, we are one of the companies with the most accumulated know-how in the Web3 space worldwide.",
    supportedEditions: ["hacktues-security", "hacktues-infinity"],
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
    name: "Stenik",
    logo: stenikLogo,
    url: "https://www.stenikgroup.com/bg/",
    description:
      "Stenik е българска технологична компания с eCommerce фокус. Започвайки като уеб агенция през 2004 г., компанията открива своята страст към електронната търговия още в ранните години на своето развитие. От 2012 г. Stenik помага на български и европейски производители, ритейлъри и брандове да оперират в дигиталната икономика посредством къстомизирани eCommerce решения. Мисията на Stenik е да предоставя и адаптира световни решения и ноу-хау за българските търговци, като по този начин ги прави по-конкурентни в дигиталната икономика. Характерно за компанията е предоставянето на изцяло in-house завършен цикъл за имплементация и поддръжка на B2C, B2B & D2C решения, а една от основните й цели е клиентите, с които си партнира, да се чувстват обезпечени от софтуерна гледна точка, за да могат да се фокусират върху своите продажби и развитие.",
  },
  {
    name: "Telelink Business Services",
    logo: tbsLogo,
    url: "https://www.tbs.tech/",
    description:
      "Telelink Business Services е една от най-големите български технологични компании и лидер в областта на адаптивните и адекватни решения на комплексни технологични нужди. С над 20 години опит и доказана експертиза, компанията съумява да прилага иновативен и висококачествен подход към клиентите си. Telelink Business Services е доставчик на ИТ решения в областта на мрежи и центрове за данни, офис производителност и информационна сигурност с 200+ клиента в България, Западните Балкани и мултинационални компании и 50+ партньори като Cisco, Broadcom, Microsoft, DELL и др.",
    supportedEditions: ["hacktues-security", "hacktues-infinity"],
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
    name: "Chaos",
    logo: chaosLogo,
    url: "https://www.chaos.com/",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-3",
      "hacktues-2",
    ],
    description:
      "Chaos е водеща световна компания в технологиите за 3D визуализация. Създадена в България, преди повече от 20 години, тя е отличена с технологични награди “Оскар” и “Емми” за принос към визуалните ефекти в киното и телевизията.  Днес Chaos има екип от повече от 700 души и офиси в 11 града по света. Почти половината от екипа работи в България. Тук е един от центровете за проучванеия и нови разработки на компанията Chaos Innovation Lab. С технологиите, създадени от екипа в София, днес работят водещи холивудски студиа и голяма част от световните архитектурни студиа. Ако се интересувате от фотореалистична графика, следете новостите, които се случват в Chaos тук: https://www.instagram.com/chaosgroup/?hl=en https://www.facebook.com/ChaosGroupBulgaria https://www.linkedin.com/company/chaos-group",
  },
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
    name: "Extreme Labs",
    logo: extremeLabsLogo,
    url: "https://extremepeering.net/en/",
    description:
      "Extreme Labs е българска компания помагаща на доставчиците на интернет и инфраструктура в Индия и Южна Азия да постигнат пълния си потенциал чрез иновативни решения за оптимизиране на скоростта, обхвата и качеството, което предлагат на клиентите си. В екипа на компанията работят както силни мрежови специалисти, благодарение на които създадохме и оперираме най-големия интернет ексчейндж в Индия, така и софтуеърни специалисти пишещи на C++, Go и Python работещи по софтуеърни продукти ползвани от над 400 интернет доставчика. Агитката от ТУЕС в компанията е голяма и затова се радваме да можем да подкрепим тазгодишният хакатон! 🙂",
  },
  {
    name: "Haemimont",
    logo: haemimontLogo,
    url: "http://www.haemimont.com/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
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
    name: "Sirma",
    logo: sirmaLogo,
    url: "https://sirma.com/",
    description:
      "Сирма е най-големият български ИТ холдинг с 32 години пазарно присъствие. В Сирма създават високотехнологични иновативни решения, услуги и продукти в едни от най-динамичните стратегически вертикали: финансов сектор, производство на опаковки, здравеопазване и науки за живота, логистика и транспорт, хотелиерство и електронна търговия. Основните хоризонтални специализации на холдинга са в сферата на изкуствения интелект и управлението на знания, IT консултации и системна интеграция.",
    supportedEditions: ["hacktues-security"],
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
    name: "Telebid Pro",
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
    description: `Знаеш ли, че Телебид Про подкрепя Hack TUES от 8г.? Защо? Защото вярваме в ТУЕС.

Последвай ни, за да не пропуснеш предизвикателствата, които сме подготвили.

=====
Телебид Про е софтуерна продуктова компания, специализирана в разработването на бизнес системи, които изгражда от идея до завършен продукт.`,
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
      "Аксидиа e българска технологична компания, предоставяща консултантски услуги и разработка на софтуерни решения. Основана през 2012 от четирима партньори, днес в Аксидиа работят над 250 човека. Приятелската атмосфера и възможностите за професионално развитие нареждат компанията сред най-добрите ИТ работодатели в България. Екипът на Аксидиа има опит с широк спектър от технологии като .NET, Java, React.js, Angular и много други.",
    supportedEditions: ["hacktues-security", "hacktues-30x"],
  },
  {
    name: "Astea Solutions",
    logo: asteaSolutionsLogo,
    url: "https://asteasolutions.com",
    description:
      "AsteaSolutions - експерти в разработката на софтуер и технологични решения! Техният успех се дължи на задружен екип от астейци, които обединяват умения и сили за иновации в различни индустрии и сфери. Споделят знание и инвестират в образование, защото вярват в младите умове!",
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
  },
  {
    name: "Dreamix",
    logo: dreamixLogo,
    url: "https://dreamix.eu/",
    description:
      "От 17 години Dreamix е една от най-успешните и бързо разрастващи се технологични компании, основани от млади ентусиасти в България. От създаването си през 2006 г., като начинание на шест студенти, днес компанията работи с десетки партньори от целия свят и има над 250 души екип. Ключов фактор за този устойчив успех е постоянният акцент върху хората, ценностите и високото качество на предоставяните услуги.",
    supportedEditions: ["hacktues-security"],
  },
  {
    name: "Dynamo Software",
    logo: dynamoSoftwareLogo,
    url: "https://www.dynamosoftware.com/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
  },
  {
    name: "GlobalFoundries Bulgaria",
    logo: globalFoundriesLogo,
    url: "https://gf.com/",
    description:
      "GlobalFoundries: Българските инженери, които реализират иновации на глобално ниво в дизайна и производството на микрочипове. GlobalFoundries Bulgaria e локалният офис на една от водещите (топ 3) компании в света за производство на микрочипове и играе ключова роля в местната технологична сцена. Компанията намира, обучава и развива инженери чрез своята успешна стажантска програма. Като водещ производител на микрочипове, компанията не само създава технически специалисти в областта на микроелектрониката, но и допринася активно за местната екосистема инвестирайки в партньорства с техническите университети и гимназии в страната.",
    supportedEditions: [],
  },
  {
    name: "Nemetschek Bulgaria",
    logo: nemetschekLogo,
    url: "https://www.nemetschek.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-365",
      "hacktues-30x",
      "hacktues-3",
      "hacktues",
    ],
  },
  {
    name: "Ocado Technology",
    logo: ocadoTechnologyLogo,
    url: "https://careers.ocadogroup.com/teams/technology",
    description:
      "В Ocado Technologу имаме за цел да променим начина, по който хората пазаруват. Решаваме някои от най-сложните софтуерни и хардуерни проблеми от сферата на онлайн търговията. В България развиваме едни от най-усъвършенстваните технологии на Ocado и работим във високотехнологични лаборатории, където тестваме и надграждаме продуктите си.\nПолезни връзки:\nWebsite: https://careers.ocadogroup.com/teams/technology \nLI page: https://www.linkedin.com/company/ocado-technology/mycompany/verification/ \nFB page: https://www.facebook.com/OcadoTechnology",
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
    name: "АЗТУЕС",
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
      "hacktues-2",
      "hacktues",
    ],
    description:
      'Асоциацията на завършилите ТУЕС е неправителствена организация, която има за цел да обедини и подпомага общността от завършили и настоящи ученици в Технологично училище "Електронни Системи" към ТУ - София (ТУЕС), преподаватели и приятели на училището. Учредена е през декември 2014 и работи активно от средата на 2015, като вече наброява над 1,000 членове и се е превърнала в двигател на редица събития и инициативи, ключови за ТУЕС общността.',
  },
  {
    name: "Бони",
    logo: boniLogo,
    url: "http://www.boniholding.com/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
  },
  {
    name: "Corporate Gifts",
    logo: corporateLogo,
    url: "https://corporategifts.bg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: ["hacktues-security"],
  },
  {
    name: "Culligan Bulgaria",
    logo: culligan,
    url: "https://www.culligan.bg/",
    description:
      "Culligan Bulgaria- всичко, от което се нуждаете, за да осигурите чиста, висококачествена вода за Вашия бизнес или домакинство. Водата, която обичате!<br>Ние в Culligan се ангажираме да изградим по-добър, по-устойчив свят чрез подобряване както на социалното, така и на нашето въздействие върху околната среда.  В Culligan вярваме, че по-чистата и по-здравословна вода може да допринесе за подобряване на живота на хората по света и е ключов двигател към решаването на някои от най-големите предизвикателства, които стоят в нашето бъдеще.",
    supportedEditions: ["hacktues-security"],
  },
  {
    name: "Dominos",
    logo: dominosLogo,
    url: "https://dominos.bg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-gg",
      "hacktues-6",
      "hacktues-365",
    ],
  },
  {
    name: "Мебели Ремо",
    logo: remoLogo,
    url: "https://mebeliremo.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
  },

  {
    name: "Smartcom",
    logo: smartcomLogo,
    url: "https://smartcom.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-6",
      "hacktues-365",
      "hacktues-30x",
      "hacktues-3",
    ],
  },
  {
    name: "Sofia Tech Park",
    logo: sofiaTechParkLogo,
    url: "https://sofiatech.bg/",
    description:
      "София Тех Парк е първият научно-технологичен парк в България. Той е хъб за изследователи, иновативни стартиращи предприятия и зрели технологични компании от България и региона. Паркът управлява и развива уникална среда за подпомагане и растеж на малки и средни фирми чрез предоставяне на ноу-хау, възможности за работа в мрежа и достъп до нови технологии в три ключови области: информационни и комуникационни технологии, науки за живота и чиста енергия. ",

    supportedEditions: [
      "hacktues-security",
      "hacktues-infinity",
      "hacktues-6",
      "hacktues-365",
      "hacktues-30x",
    ],
  },
];

const MEDIA_PARTNERS = [
  // {
  //   name: "bTV",
  //   logo: btvLogo,
  //   url: "https://www.btv.bg/",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   supportedEditions: [],
  // },
  {
    name: "Darik Business Review",
    logo: darikBusinessReviewLogo,
    url: "https://darik.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
  },
  {
    name: "DevStyleR",
    logo: devstylerLogo,
    url: "https://devstyler.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
  },
  {
    name: "Economy.bg",
    logo: economyBgLogo,
    url: "https://economy.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
  },
  {
    name: "Инженер.bg",
    logo: inzhenerBgLogo,
    url: "https://xn--e1aabhzcw.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    customClass:
      "bg-[linear-gradient(180deg,_#24587d_0%,_#1578b2_68%,_#1578b2_100%)]",
    supportedEditions: [],
  },
  {
    name: "Kaldata",
    logo: kaldataLogo,
    url: "https://www.kaldata.com/tag/хакатон",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    supportedEditions: [],
  },
  {
    name: "Мениджър",
    logo: managerLogo,
    url: "https://www.manager.bg/",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    name: "Обекти",
    logo: obektiBgLogo,
    url: "https://obekti.bg/",
    customClass: "bg-black border-2 border-white",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export {
  ALPHA_SPONSORS,
  BETA_SPONSORS,
  GAMMA_SPONSORS,
  PARTNERS,
  MEDIA_PARTNERS,
};

export type Podkrepqsht =
  | (typeof ALPHA_SPONSORS)[number]
  | (typeof BETA_SPONSORS)[number]
  | (typeof GAMMA_SPONSORS)[number]
  | (typeof PARTNERS)[number]
  | (typeof MEDIA_PARTNERS)[number];

export const MEDIA_ARTICLES = [
  {
    name: "Economy.bg",
    title: "Предстои 10-ото юбилейно издание на Hack TUES X",
    logo: economyBgLogo,
    url: "https://economy.bg/innovations/view/57470/Predstoi-10-oto-jubilejno-izdanie-na-Hack-TUES-X",
    date: new Date(2024, JANUARY, 26),
  },
  {
    name: "Darik Business Review",
    title: "Десетото юбилейно издание Hack TUES X стартира на 13 март",
    logo: darikBusinessReviewLogo,
    url: "https://dbr.bg/8925",
    date: new Date(2024, JANUARY, 24),
  },
  {
    name: "Kaldata",
    title: "Hack TUES X стартира през март 2024 година",
    bg: "#fff",
    logo: kaldataLogo,
    url: "https://www.kaldata.com/it-%D0%BD%D0%BE%D0%B2%D0%B8%D0%BD%D0%B8/hack-tues-x-%D1%81%D1%82%D0%B0%D1%80%D1%82%D0%B8%D1%80%D0%B0-%D0%BF%D1%80%D0%B5%D0%B7-%D0%BC%D0%B0%D1%80%D1%82-2024-%D0%B3%D0%BE%D0%B4%D0%B8%D0%BD%D0%B0-461309.html",
    date: new Date(2024, JANUARY, 24),
  },
  {
    name: "DevStyleR",
    title: "Десетото Юбилейно Издание Hack TUES X Стартира през Март",
    logo: devstylerLogo,
    url: "https://devstyler.bg/blog/2024/01/23/desetoto-yubilejno-izdanie-hack-tues-x-startira-prez-mart/",
    date: new Date(2024, JANUARY, 23),
  },
  {
    name: "Кариери.bg",
    title:
      "Ученици по технологии ще работят с експерти от 30 ИТ компании на HackTUES",
    logo: karieribgLogo,
    url: "https://www.karieri.bg/news/40146_uchenici-po-tehnologii-shche-rabotyat-s-eksperti-ot-30",
    date: new Date(2023, FEBRUARY, 23),
  },
  {
    name: "БНР София",
    title: "224 ученици и 25 фирми участват в осмия хакатон на ТУЕС",
    logo: bnrLogo,
    url: "https://bnr.bg/sofia/post/101613996/tues",
    date: new Date(2023, MARCH, 10),
  },
  {
    name: "Столица.bg",
    title: "Започна осмият хакатон на Технологично училище в София",
    logo: capitalLogo,
    url: "https://stolica.bg/sofia/zapochna-osmiyat-hakaton-na-tehnologichno-uchilishte-v-sofiya",
    date: new Date(2023, MARCH, 10),
  },
  {
    name: "Investor.BG",
    title:
      "Знания и талант ще демонстрират ученици в осмото издание на хакатона HackTUES",
    logo: investorLogo,
    url: "https://www.investor.bg/a/261-novini/347522-znaniya-i-talant-shte-demonstrirat-uchenitsi-v-osmoto-izdanie-na-hakatona-hacktues",
    date: new Date(2023, MARCH, 8),
  },
  {
    name: "Bloomberg TV Bulgaria",
    title:
      "Ученици демонстрират знания и талант в осмото издание на хакатона HackTUES",
    logo: bloombergLogo,
    url: "https://www.bloombergtv.bg/a/16-biznes-start/104120-uchenitsi-demonstrirat-znaniya-i-talant-osmoto-izdanie-na-hakatona-hacktues",
    date: new Date(2023, MARCH, 8),
  },
];

export type MediaArticle = (typeof MEDIA_ARTICLES)[number];
