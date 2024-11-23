import { Metadata } from "next";

import { HT_EDITION_NAME } from "~/app/_configs/hackathon";
import { getServerSideGrowthBook } from "~/app/_integrations/growthbook";
import { getTeamById } from "~/app/(full-layout)/teams/service";
import { ComingSoonPage } from "~/app/components/coming-soon/coming-soon-page";
import Mentor from "~/app/components/MentorCard/Mentor";
import { getParticipantFromSession } from "~/app/participants/service";
import { getAllMentors } from "./service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ментори",
  description: `Менторите на ${HT_EDITION_NAME}`,
  openGraph: {
    title: "Ментори",
    description: `Менторите на ${HT_EDITION_NAME}`,
  },
};

export default async function MentorsPage() {
  const gb = await getServerSideGrowthBook();
  if (gb.isOff("show-mentors")) {
    return <ComingSoonPage />;
  }

  const participant = await getParticipantFromSession();
  const participantTeam = await getTeamById(participant?.team.id ?? "");
  const mentors = await getAllMentors();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mt-5 flex-col gap-5 text-center text-5xl font-extrabold">
        Ментори
      </h1>
      <div className="m-1 inline-grid w-full grid-cols-1 gap-8 sm:m-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
        {mentors.map((mentor) => (
          <Mentor
            key={mentor.id}
            mentor={mentor}
            participant={participant}
            participantTeam={participantTeam}
            isMentorTaken={mentor.team !== null}
          />
        ))}
      </div>
    </div>
  );
}
