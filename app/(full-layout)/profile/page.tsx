import ProfileInfo from "~/app/(full-layout)/profile/_components/profile-info";
import { getParticipantFromSession } from "~/app/participants/service";

export default async function ProfilePage() {
  const participant = await getParticipantFromSession();

  return participant ? <ProfileInfo participant={participant} /> : null;
}
