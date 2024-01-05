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

export const SOCIAL_MEDIA = [
  {
    platform: "Instagram",
    handle: "@hacktuesfest",
    link: "https://instagram.com/hacktuesfest",
    icon: FaInstagram,
    feature: "show-facebook" satisfies HTFeature,
  },
  {
    platform: "Facebook",
    handle: "Hack TUES § TUES FEST",
    link: "https://facebook.com/HackTUES",
    icon: FaFacebookF,
    feature: "show-instagram" satisfies HTFeature,
  },
  {
    platform: "LinkedIn",
    handle: "Hack TUES & TUES Fest",
    link: "https://linkedin.com/company/hacktues-tuesfest/",
    icon: FaLinkedin,
    feature: "show-linkedin" satisfies HTFeature,
  },
  {
    platform: "YouTube",
    handle: "@TUES",
    link: "https://youtube.com/@TUES",
    icon: FaYoutube,
    feature: "show-youtube" satisfies HTFeature,
  },
  {
    platform: "TikTok",
    handle: "@hacktuesfest",
    link: "https://www.tiktok.com/@hacktuesfest",
    icon: FaTiktok,
    feature: "show-tiktok" satisfies HTFeature,
  },
  {
    platform: "Linktree",
    handle: "@hacktuesfest",
    link: "https://linktr.ee/hacktuesfest",
    icon: SiLinktree,
    feature: "show-linktree" satisfies HTFeature,
  },
  {
    platform: "Twitter/X",
    handle: "@hacktuesfest",
    link: "https://x.com/hacktuesfest",
    icon: FaXTwitter,
    feature: "show-twitter" satisfies HTFeature,
  },
  {
    platform: "Email",
    handle: "hacktues@elsys-bg.org",
    link: "mailto:hacktues@elsys-bg.org",
    icon: LuMail,
    feature: "show-email" satisfies HTFeature,
  },
] as const;

export type SocialMedia = (typeof SOCIAL_MEDIA)[number];
