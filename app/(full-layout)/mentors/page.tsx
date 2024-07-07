import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { ComingSoonPage } from "~/app/components/coming-soon/coming-soon-page";
import Mentor from "~/app/components/MentorCard/Mentor";
import { getAllMentors } from "./service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ментори",
  description: "Менторите на Hack TUES X",
  openGraph: {
    title: "Ментори",
    description: "Менторите на Hack TUES X",
  },
};

export default async function MentorsPage() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("show-mentors")) {
    return <ComingSoonPage />;
  }

  const mentors = await getAllMentors();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mt-5 flex-col gap-5 text-center text-5xl font-extrabold">
        Ментори
      </h1>
      <div className="m-1 inline-grid w-full grid-cols-1 gap-8 sm:m-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        {mentors.map((mentor: any) => (
          <Mentor key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}
