import { useState } from "react";

import { getHTSession } from "../api/auth/session";
import MentorFrom from "../components/mentorForm";

export default async function Home() {
  // const mentors = await getMentors();
  const session = await getHTSession();
  console.log(session?.user?.email);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-4 w-full text-center">
        <h1 className="text-2xl font-semibold">Mentors:</h1>
      </div>
      <div className="w-full"></div>
    </div>
  );
}
