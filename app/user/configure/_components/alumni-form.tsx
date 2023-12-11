"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-dropdown-select";

import { parseElsysEmail } from "~/app/_elsys/service";
import { convertToTechnology, technologies } from "~/app/technologies";
import { getParticipant, insertParticipant } from "../actions";

const AlumniForm = ({ email }: { email: string }) => {
  return null;
};

export default AlumniForm;
