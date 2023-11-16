import { notFound } from "next/navigation";

import { getServerSideGrowthBook } from "../_integrations/growthbook";
import Mentor from "../components/MentorCard/Mentor";
import { getAllMentors } from "./service";

export default async function Home() {
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
