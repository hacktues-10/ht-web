import { Metadata } from "next";

import ProfileInfo from "~/app/(full-layout)/profile/_components/profile-info";
import { signInRedirect } from "~/app/api/auth/session";
import { getParticipantFromSession } from "~/app/participants/service";

export const metadata: Metadata = {
  title: "Профил",
  description: "Профил на участника в Hack TUES X",
};

export default async function ProfilePage() {
  const participant = await getParticipantFromSession();
  if (!participant) {
    signInRedirect();
  }
  return <ProfileInfo participant={participant} />;
}
