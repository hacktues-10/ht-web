import Link from "next/link";

import { SOCIAL_MEDIA, SocialMedia } from "~/app/_configs/pr";
import { HTXLogoDuotone } from "./logos";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Footer = () => (
  <footer className="flex flex-col items-center justify-between gap-4 bg-background px-6 pb-2 pt-6 md:flex-row md:pt-2">
    <Link href="/" className="text-center text-2xl md:text-xl">
      <HTXLogoDuotone />
    </Link>
    <p className="text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} ТУЕС към ТУ-София. Всички права са запазени.
    </p>
    <Separator decorative={true} className="w-48 md:hidden" />
    <SocialMediaIconRow />
  </footer>
);

export const SocialMediaIconRow = () => (
  <ul className="flex">
    {SOCIAL_MEDIA.filter((media) => media.showInFooter).map((media) => (
      <li key={media.platform}>
        <SocialMediaIconButton media={media} />
      </li>
    ))}
    {/* IDEA: show all media on small screens (looks bad) */}
    {/* {SOCIAL_MEDIA.filter((media) => !media.showInFooter).map(
            (media) => (
              <li key={media.platform} className="md:hidden">
                <MediaIconButton media={media} />
              </li>
            ),
          )} */}
  </ul>
);

export const SocialMediaIconButton = ({ media }: { media: SocialMedia }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          asChild
          className="transition-transform hover:scale-110"
        >
          <Link href={media.link} target="_blank">
            <media.icon />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{media.handle}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
