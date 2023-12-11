import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiLinktree } from "react-icons/si";

export const SOCIAL_MEDIA = [
  {
    platform: "Instagram",
    handle: "@hacktuesfest",
    link: "https://instagram.com/hacktuesfest",
    icon: FaInstagram,
    showInFooter: true,
  },
  {
    platform: "Facebook",
    handle: "Hack TUES § TUES FEST",
    link: "https://facebook.com/HackTUES",
    icon: FaFacebookF,
    showInFooter: true,
  },
  {
    platform: "LinkedIn",
    handle: "Hack TUES & TUES Fest",
    link: "https://linkedin.com/company/hacktues-tuesfest/",
    icon: FaLinkedin,
    showInFooter: true,
  },
  {
    platform: "YouTube",
    handle: "@TUES",
    link: "https://youtube.com/@TUES",
    icon: FaYoutube,
    showInFooter: false,
  },
  {
    platform: "Linktree",
    handle: "@hacktuesfest",
    link: "https://linktr.ee/hacktuesfest",
    icon: SiLinktree,
    showInFooter: false,
  },
  {
    platform: "Twitter/X",
    handle: "@hacktuesfest",
    link: "https://x.com/hacktuesfest",
    icon: FaXTwitter,
    showInFooter: false,
  },
] as const;

export type SocialMedia = (typeof SOCIAL_MEDIA)[number];
