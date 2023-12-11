"use client";

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Select from "react-dropdown-select";

import { parseElsysEmail } from "~/app/_elsys/service";
import { convertToTechnology, technologies } from "~/app/technologies";
import { getParticipant, insertParticipant } from "../actions";
import { AlumniRegistrationSchema } from "../schemas";
import { AlumniStep1 } from "./steps/step1";

const AlumniForm = ({ email }: { email: string }) => {
  const [formData, update] = useReducer(
    (
      state: AlumniRegistrationSchema,
      update: Partial<AlumniRegistrationSchema>,
    ) => ({
      ...state,
      ...update,
    }),
    {
      firstName: "",
      secondName: "",
      lastName: "",
      phoneNumber: "",
      isAlumni: false,
      regulationAgreement: false,
      grade: "" as any, // zod does validation on this
      parallel: "" as any, // ...and this
      allergies: "",
      tShirtId: -10,
      technologies: "",
      isLookingForTeam: false,
      question1: "",
      question2: "",
    } satisfies AlumniRegistrationSchema,
  );

  return <AlumniStep1 email={email} initialData={formData} onNext={() => {}} />;
};

export default AlumniForm;
