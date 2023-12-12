import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-dropdown-select";
import invariant from "tiny-invariant";

import { parseElsysEmail } from "~/app/_elsys/service";
import { getHTSession } from "~/app/api/auth/session";
import { Card } from "~/app/components/ui/card";
import { Participant } from "~/app/participants/service";
import { convertToTechnology, technologies } from "~/app/technologies";
import { getParticipant, insertParticipant } from "../actions";
import AlumniForm from "./alumni-form";

export const ParticipantForm = async () => {
  const session = await getHTSession();
  invariant(
    session?.user?.email,
    "No email in session or no session at all even :(",
  );
  const isAlumni = parseElsysEmail(session.user.email)?.isAlumni ?? true;

  return isAlumni ? (
    <AlumniForm email={session.user.email} />
  ) : (
    // <ParticipantForm />
    <Card className="p-3">
      <p className="text-muted">Регистрацията на ученици още не е отворена.</p>
    </Card>
  );
};
