import { useState } from "react";

import { getHTSession } from "../api/auth/session";
import { Mentor } from "../components/Mentor";
import { getAllMentors } from "./actions";

export default async function Home() {
  const mentors = await getAllMentors();
  console.log(mentors);
  const session = await getHTSession();
  console.log(session?.user?.email);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold">Mentors:</h1>

      <div className="w-full"></div>
      {mentors.map((mentor) => (
        <Mentor key={mentor.email} mentor={mentor} />
      ))}
    </div>
  );
}
