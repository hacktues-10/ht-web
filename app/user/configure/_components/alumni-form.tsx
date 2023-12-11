"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-dropdown-select";

import { parseElsysEmail } from "~/app/_elsys/service";
import { convertToTechnology, technologies } from "~/app/technologies";
import { getParticipant, insertParticipant } from "../actions";
import { AlumniStep1 } from "./steps/step1";

const AlumniForm = ({ email }: { email: string }) => {
  return <AlumniStep1 email={email} initialData={{}} onNext={() => {}} />;
};

export default AlumniForm;
