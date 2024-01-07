import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import Mentor from "~/app/components/MentorCard/Mentor";
import { getAllMentors } from "./service";

export const metadata: Metadata = {
  title: "Ментори",
  description: "Менторите на Hack TUES X",
};

export default async function MentorsPage() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("show-mentors")) {
    notFound();
  }

  const mentors = await getAllMentors();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-semibold">Mentors:</h1>
      <div className="flex w-full flex-row">
        {mentors.map((mentor) => (
          <Mentor key={mentor.email} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}
