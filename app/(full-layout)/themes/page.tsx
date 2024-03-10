import Image from "next/image";

import { Separator } from "~/app/components/ui/separator";

const mainTheme = {
  theme: "",
  description: "",
  image: {
    alt: "",
    url: "",
    width: 0,
    height: 0,
  },
};

export default function ThemesPage() {
  return (
    <div className="flex w-full flex-col items-center gap-11">
      <div className="flex max-w-md flex-col gap-2">
        <div
          className="flex select-none items-center justify-center text-center font-llpixel text-5xl text-brand sm:text-6xl"
          role="presentation"
        >
          <span className="translate-x-20 sm:translate-x-24">Hack </span>
          <Image
            className="w-56 sm:w-72"
            src={mainTheme.image.url}
            width={mainTheme.image.width}
            height={mainTheme.image.height}
            alt={mainTheme.image.alt}
          />
          <span className="-translate-x-20 sm:-translate-x-24"> TUES</span>
        </div>
        <Separator />
        <h1 className="mt-5 flex flex-col gap-5 text-center font-lazydog text-3xl font-semibold sm:text-5xl">
          {mainTheme.theme}
        </h1>
      </div>
    </div>
  );
}
