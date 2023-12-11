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
import { Separator } from "~/app/components/ui/separator";
import { convertToTechnology, technologies } from "~/app/technologies";
import { getParticipant, insertParticipant } from "../actions";
import { AlumniRegistrationSchema } from "../schemas";
import { AlumniStep1 } from "./steps/step1";
import { AlumniStep2 } from "./steps/step2";
import { EveryoneStep3 } from "./steps/step3";

const AlumniForm = ({ email }: { email: string }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, updateData] = useReducer(
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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleNext(stepData: Partial<AlumniRegistrationSchema>) {
    updateData(stepData);
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrev() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  return (
    <div className="flex h-full flex-col gap-1">
      <AlumniStep1
        className={currentStep === 1 ? "" : "hidden"}
        email={email}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <AlumniStep2
        className={currentStep === 2 ? "" : "hidden"}
        email={email}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <EveryoneStep3
        className={currentStep === 3 ? "" : "hidden"}
        email={email}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <div className="py-5">
        <Separator />
      </div>
      {/* FIXME: hardcoded count */}
      <p className="text-center text-sm text-muted-foreground">
        Стъпка {currentStep}/5
      </p>
      <p className="text-center text-sm text-muted-foreground">
        При проблеми се свържете с нас на адрес{" "}
        <a
          href="mailto:hacktues@elsys-bg.org"
          className="font-medium underline underline-offset-4"
        >
          hacktues@elsys-bg.org
        </a>
      </p>
    </div>
  );
};

export default AlumniForm;
