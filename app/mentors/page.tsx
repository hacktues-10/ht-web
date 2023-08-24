import { getHTSession } from "../api/auth/session";
import MentorFrom from "../components/mentorForm";

export default async function Home() {
  const session = await getHTSession();
  console.log(session?.user?.email);
  return <MentorFrom email={session?.user?.email} />;
}
