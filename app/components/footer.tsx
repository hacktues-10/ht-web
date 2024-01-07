import Link from "next/link";

import { SOCIAL_MEDIA, SocialMedia } from "~/app/_configs/pr";
import { IfHTFeatureOn } from "../_integrations/components";
import { HTXLogoDuotone } from "./logos";
import { SleepySully } from "./logos/sleepy-sully";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const Footer = () => (
  <footer className="relative flex flex-col items-center justify-between gap-4 bg-background px-6 pb-2 pt-6 md:flex-row md:pt-2">
    <SleepySully className="0 -sm:translate-x-10 -sm:translate-x-10 absolute left-1/2 right-1/2 top-0 h-32 -translate-x-1/2 -translate-y-full overflow-visible sm:left-auto sm:right-10 sm:translate-x-0" />
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
    {SOCIAL_MEDIA.map((media) => (
      <IfHTFeatureOn feature={media.feature} key={media.platform}>
        <li>
          <SocialMediaIconButton media={media} />
        </li>
      </IfHTFeatureOn>
    ))}
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
