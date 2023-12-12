// "use client"

// import { useState, useEffect } from "react";
import { X } from "lucide-react";

import RenderProfileInfo from "~/app/components/ChoseTechnology";
import { getParticipantFromSession } from "~/app/participants/service";

export default async function ProfilePage() {
  const participant = await getParticipantFromSession();

  return participant ? <RenderProfileInfo participant={participant} /> : null;
}
