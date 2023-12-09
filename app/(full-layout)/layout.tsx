import Link from "next/link";

import { Header } from "../components/header";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { SOCIAL_MEDIA, SocialMedia } from "../pr";

export default function FullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-start justify-center overflow-x-clip p-6">
        {children}
      </main>
      <Separator />
      <Footer />
    </>
  );
}

const Footer = () => (
  <footer className="flex flex-col items-center justify-between gap-4 px-6 pb-2 pt-6 md:flex-row md:pt-2">
    <Link
      href="/"
      className="text-center font-llpixel text-2xl text-brand md:text-xl"
    >
      Hack TUES <span className="text-sand">X</span>
    </Link>
    <p className="text-center text-sm text-gray-500">
      © {new Date().getFullYear()} ТУЕС към ТУ-София. Всички права са запазени.
    </p>
    <Separator decorative={true} className="w-48 md:hidden" />
    <ul className="flex">
      {SOCIAL_MEDIA.filter((media) => media.showInFooter).map((media) => (
        <li key={media.platform}>
          <MediaIconButton media={media} />
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
  </footer>
);

const MediaIconButton = ({ media }: { media: SocialMedia }) => (
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
