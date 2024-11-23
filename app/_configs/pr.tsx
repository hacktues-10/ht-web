import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { SiLinktree } from "react-icons/si";

import { HTFeature } from "../_context/growthbook/features";
import { HT_CONTACT_EMAIL } from "./hackathon";

// Не трябва да завършва с точка – на местата, на които тази константа
// се използва, ако има нужда от точка, се добавя там.
export const HT_EVENT_HEADLINE =
  "Единственият хакатон в България, организиран от ученици за ученици";

// Background цветът на сайта
export const HT_EDITION_BACKGROUND_COLOR = "#030712";
// Primary цветът на сайта
export const HT_EDITION_PRIMARY_COLOR = "#ffdfa8";

export const SOCIAL_MEDIA = [
  {
    platform: "Instagram",
    handle: "@hacktuesfest",
    link: "https://instagram.com/hacktuesfest",
    icon: FaInstagram,
    feature: "show-facebook" satisfies HTFeature,
    featureMobile: "show-facebook-mobile" satisfies HTFeature,
  },
  {
    platform: "Facebook",
    handle: "Hack TUES § TUES FEST",
    link: "https://facebook.com/HackTUES",
    icon: FaFacebookF,
    feature: "show-instagram" satisfies HTFeature,
    featureMobile: "show-instagram-mobile" satisfies HTFeature,
  },
  {
    platform: "LinkedIn",
    handle: "Hack TUES & TUES Fest",
    link: "https://linkedin.com/company/hacktues-tuesfest/",
    icon: FaLinkedin,
    feature: "show-linkedin" satisfies HTFeature,
    featureMobile: "show-linkedin-mobile" satisfies HTFeature,
  },
  {
    platform: "YouTube",
    handle: "@TUES",
    link: "https://youtube.com/@TUES",
    icon: FaYoutube,
    feature: "show-youtube" satisfies HTFeature,
    featureMobile: "show-youtube-mobile" satisfies HTFeature,
  },
  {
    platform: "TikTok",
    handle: "@hacktuesfest",
    link: "https://www.tiktok.com/@hacktuesfest",
    icon: FaTiktok,
    feature: "show-tiktok" satisfies HTFeature,
    featureMobile: "show-tiktok-mobile" satisfies HTFeature,
  },
  {
    platform: "Linktree",
    handle: "@hacktuesfest",
    link: "https://linktr.ee/hacktuesfest",
    icon: SiLinktree,
    feature: "show-linktree" satisfies HTFeature,
    featureMobile: "show-linktree-mobile" satisfies HTFeature,
  },
  {
    platform: "Twitter/X",
    handle: "@hacktuesfest",
    link: "https://x.com/hacktuesfest",
    icon: FaXTwitter,
    feature: "show-twitter" satisfies HTFeature,
    featureMobile: "show-twitter-mobile" satisfies HTFeature,
  },
  {
    platform: "Email",
    handle: HT_CONTACT_EMAIL,
    link: `mailto:${HT_CONTACT_EMAIL}`,
    icon: LuMail,
    feature: "show-email" satisfies HTFeature,
    featureMobile: "show-email-mobile" satisfies HTFeature,
  },
] as const;

export type SocialMedia = (typeof SOCIAL_MEDIA)[number];
