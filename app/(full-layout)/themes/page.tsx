import React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/app/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";
import { Separator } from "~/app/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { cn } from "~/app/utils";

const mainTheme = {
  theme: "",
  description: "",
  image: {
    alt: "",
    url: "",
    width: 3292,
    height: 3292,
  },
};

const subtheme1 = {
  theme: "",
  description: "",
  image: {
    alt: "",
    url: "",
    width: 3840,
    height: 2160,
  },
};

const subtheme2 = {
  theme: "",
  description: "",
  image: {
    alt: "",
    url: "",
    width: 3840,
    height: 2160,
  },
};

const subtheme3 = {
  theme: "",
  description: "",
  image: {
    alt: "",
    url: "",
    width: 3840,
    height: 2160,
  },
};

const subthemeAlumni = {
  theme: "",
  description: "",
  image: {
    alt: "",
    url: "",
    width: 3840,
    height: 2160,
  },
};

type Theme = {
  theme: string;
  description: string;
  image: {
    alt: string;
    url: string;
    width: number;
    height: number;
  };
};

function MainThemeDisplay(props: { theme: Theme }) {
  return (
    <div className="flex max-w-md flex-col gap-2">
      <div
        className="flex select-none items-center justify-center text-center font-llpixel text-5xl text-brand sm:text-6xl"
        role="presentation"
      >
        <span className="translate-x-20 sm:translate-x-16">Hack </span>
        <Image
          className="w-56 sm:w-72"
          src={props.theme.image.url}
          width={props.theme.image.width}
          height={props.theme.image.height}
          alt={props.theme.image.alt}
        />
        <span className="-translate-x-20 sm:-translate-x-16"> TUES</span>
      </div>
      <Separator />
      <h1 className="mt-5 flex flex-col gap-5 text-center font-lazydog text-3xl font-normal sm:text-5xl">
        {props.theme.theme}
      </h1>
    </div>
  );
}

function SubThemeDisplay(props: { theme: Theme; className?: string }) {
  // make sure that the image is on top of the title
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "rounded-md ring-offset-background transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-4",
          props.className,
        )}
      >
        <Card className="h-full">
          <CardHeader className="items-center gap-2 text-center">
            <Image
              src={props.theme.image.url}
              width={props.theme.image.width}
              height={props.theme.image.height}
              alt={props.theme.image.alt}
            />
            <CardTitle className="font-lazydog text-3xl font-normal">
              {props.theme.theme}
            </CardTitle>
          </CardHeader>
          <div className="pt-1" />
          <CardContent>
            {props.theme.description.split("\n").map((line, index) => (
              <CardDescription key={index}>{line}</CardDescription>
            ))}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.theme.theme}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-7">
          <Image
            src={props.theme.image.url}
            width={props.theme.image.width}
            height={props.theme.image.height}
            alt={props.theme.image.alt}
          />

          <DialogDescription className="text-base">
            {props.theme.description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ThemesContainer({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex max-w-7xl grid-cols-1 flex-col items-stretch justify-center gap-4 pt-2 md:flex-row">
      {children}
    </div>
  );
}

export default function ThemesPage() {
  return (
    <div className="flex w-full flex-col items-center gap-11">
      <MainThemeDisplay theme={mainTheme} />
      <Tabs className="content-center" defaultValue="students">
        <TabsList className="mx-auto flex w-min" defaultValue="students">
          <TabsTrigger value="students">Ученици</TabsTrigger>
          <TabsTrigger value="alumni">Завършили</TabsTrigger>
        </TabsList>
        <TabsContent value="students" tabIndex={-1}>
          <ThemesContainer>
            <SubThemeDisplay theme={subtheme1} />
            <SubThemeDisplay theme={subtheme2} />
            <SubThemeDisplay theme={subtheme3} />
          </ThemesContainer>
        </TabsContent>
        <TabsContent value="alumni" tabIndex={-1}>
          <ThemesContainer>
            <SubThemeDisplay theme={subthemeAlumni} className="md:w-1/3" />
          </ThemesContainer>
        </TabsContent>
      </Tabs>
      <div className="hidden pt-10 md:block" />
    </div>
  );
}
