//Alpha sponsors
import bloombergLogo from "../assets/media/bloomberg.png";
import bnrLogo from "../assets/media/bnr.png";
import capitalLogo from "../assets/media/capital.png";
import devstylerArticleLogo from "../assets/media/devstyler.png";
import investorLogo from "../assets/media/investor.png";
import karieribgLogo from "../assets/media/karieribg.png";
//Partners
import a1Logo from "../assets/sponsors/alpha/a1.png";
import boschECSLogo from "../assets/sponsors/alpha/bosch-engineering-center-sofia.png";
import codbexLogo from "../assets/sponsors/alpha/codbex.png";
//import dxcLogo from "../assets/sponsors/alpha/dxc.png";
import elevenVenturesLogo from "../assets/sponsors/alpha/eleven-ventures.png";
import sapLogo from "../assets/sponsors/alpha/sap.png";
//import tbsLogo from "../assets/sponsors/alpha/tbs.png";
import trading212Logo from "../assets/sponsors/alpha/trading212.png";
//Beta sponsors
import devrixLogo from "../assets/sponsors/beta/devrix.png";
import itGixLogo from "../assets/sponsors/beta/itGix.png";
import stamsoftLogo from "../assets/sponsors/beta/stamsoft.png";
import strypesLogo from "../assets/sponsors/beta/strypes.png";
import telebidProLogo from "../assets/sponsors/beta/telebidPro.png";
import tumbaSolutionsLogo from "../assets/sponsors/beta/tumba-solutions.png";
//Gamma sponsors
import progressLogo from "../assets/sponsors/gamma/progress.png";
import aztuesLogo from "../assets/sponsors/partners/aztues.png";
import cometLogo from "../assets/sponsors/partners/comet.png";
import corporateLogo from "../assets/sponsors/partners/corporate.png";
import devstylerLogo from "../assets/sponsors/partners/devstyler.png";
import dominosLogo from "../assets/sponsors/partners/dominos.png";
import greenCherryLogo from "../assets/sponsors/partners/green_cherry.png";
import pureWaterLogo from "../assets/sponsors/partners/pure_water.png";
import smartcomLogo from "../assets/sponsors/partners/smartcom.png";
import sofiaTechParkLogo from "../assets/sponsors/partners/sofia-tech-park.png";

const ALPHA_SPONSORS = [
  {
    name: "Bosch Engineering Center Sofia",
    logo: boschECSLogo,
    url: "https://www.bosch.bg/",
  },
  {
    name: "codbex",
    logo: codbexLogo,
    url: "https://www.codbex.com/",
  },
  {
    name: "Eleven Ventures",
    logo: elevenVenturesLogo,
    url: "https://www.11.vc/",
  },
  {
    name: "SAP Labs България",
    logo: sapLogo,
    url: "https://www.sap.com/bulgaria/",
  },
  {
    name: "Trading 212",
    logo: trading212Logo,
    url: "https://www.trading212.com/",
  },
];

const BETA_SPONSORS = [
  {
    name: "Devrix",
    logo: devrixLogo,
    url: "https://devrix.com/",
  },
  {
    name: "ITGix",
    logo: itGixLogo,
    url: "https://itgix.com/",
  },
  {
    name: "Stam Soft",
    logo: stamsoftLogo,
    url: "https://www.stamsoft.com/",
  },
  {
    name: "Strypes Group",
    logo: strypesLogo,
    url: "https://strypes.eu/",
  },
  {
    name: "Telebid Pro",
    logo: telebidProLogo,
    url: "https://telebid-pro.com/",
  },
  {
    name: "Tumba Solutions",
    logo: tumbaSolutionsLogo,
    url: "https://www.tumba.solutions/",
  },
];

const GAMMA_SPONSORS = [
  {
    name: "Progress",
    logo: progressLogo,
    url: "https://www.progress.com/",
  },
  {
    name: "Progress1",
    logo: progressLogo,
    url: "https://www.progress.com/",
  },
  {
    name: "Progress2",
    logo: progressLogo,
    url: "https://www.progress.com/",
  },
  {
    name: "Progress3",
    logo: progressLogo,
    url: "https://www.progress.com/",
  },
  {
    name: "Progress4",
    logo: progressLogo,
    url: "https://www.progress.com/",
  },
];

const PARTNERS = [
  {
    name: "A1",
    logo: a1Logo,
    url: "https://www.a1.bg/",
  },
  {
    name: "AZTUES",
    logo: aztuesLogo,
    url: "https://aztues.bg/",
  },
  {
    name: "Comet Electronics",
    logo: cometLogo,
    url: "https://comet.bg/",
  },
  {
    name: "Corporate Gifts",
    logo: corporateLogo,
    url: "https://corporategifts.bg",
  },
  {
    name: "DevStyler",
    logo: devstylerLogo,
    url: "https://devstyler.bg/",
  },
  {
    name: "Dominos",
    logo: dominosLogo,
    url: "https://dominos.bg",
  },
  {
    name: "Green Cherry Cafe",
    logo: greenCherryLogo,
    url: "https://bg-bg.facebook.com/greencherrycafe/",
  },
  {
    name: "Pure Water",
    logo: pureWaterLogo,
    url: "https://purewater.bg/",
  },
  {
    name: "Smartcom",
    logo: smartcomLogo,
    url: "https://smartcom.bg/",
  },
  {
    name: "Sofia Tech Park",
    logo: sofiaTechParkLogo,
    url: "https://sofiatech.bg/",
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
