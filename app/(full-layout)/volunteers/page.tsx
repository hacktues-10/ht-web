import { Metadata } from "next";
import Image from "next/image";

import { volunteers } from "~/app/_configs/volunteers";
import { Card, CardDescription, CardHeader } from "~/app/components/ui/card";

export const metadata: Metadata = {
  title: "Доброволци",
  description: "Доброволците на Hack TUES X",
  openGraph: {
    title: "Доброволци",
    description: "Доброволците на Hack TUES X",
  },
};

export default function Volunteers() {
  return (
    <div className="min-h-screen">
      <h1 className="my-5 flex flex-col gap-5 text-center text-5xl font-extrabold">
        Доброволци
      </h1>
      <div className="m-1 inline-grid w-full grid-cols-1 justify-items-center gap-8 sm:m-5 lg:grid-cols-3">
        {volunteers.map((volunteer, index) => (
          <Card
            key={index}
            className={`items-center justify-center rounded-lg px-3 shadow-lg ${
              index === volunteers.length - 1
                ? "col-start-1 lg:col-start-2"
                : ""
            }`}
          >
            <div className="mt-4 h-[280px] max-h-[280px] w-full overflow-hidden rounded-xl sm:h-[300px] sm:max-h-[300px]">
              <Image
                src={`/volunteers/${volunteer.fileName}`}
                className="mx-auto overflow-hidden rounded-xl sm:hidden"
                alt={volunteer.name}
                width={260}
                height={260}
              />
              <Image
                src={`/volunteers/${volunteer.fileName}`}
                className="mx-auto hidden overflow-hidden rounded-xl sm:block"
                alt={volunteer.name}
                width={300}
                height={300}
              />
            </div>
            <div className="h-min px-6 pt-2 text-left text-xl font-semibold sm:pt-6 sm:text-2xl">
              <h2>{volunteer.name}</h2>
            </div>
            <CardHeader className="pt-0 text-left text-xl font-semibold sm:text-2xl">
              <CardDescription className="text-base">
                {volunteer.class}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
