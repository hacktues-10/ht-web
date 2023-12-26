"use client";

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Separator } from "~/app/components/ui/separator";
import { registerAlumni } from "../actions";
import { AlumniRegistrationSchema, alunmiRegistrationSchema } from "../schemas";
import { AlumniStep1 } from "./steps/step1";
import { AlumniStep2 } from "./steps/step2";
import { EveryoneStep3 } from "./steps/step3";
import { EveryoneStep4 } from "./steps/step4";
import { AlumniStep5 } from "./steps/step5";

const defaultValues = {
  firstName: "",
  secondName: "",
  lastName: "",
  phoneNumber: "",
  isAlumni: false,
  regulationAgreement: false,
  publicDataConsent: false,
  personalDataConsent: false,
  class: {
    grade: "" as any, // zod does validation on this
    parallel: "" as any, // ...and this
  },
  allergies: "",
  tShirtId: -10,
  technologies: "",
  isLookingForTeam: true,
  question1: "",
  question2: "",
} satisfies AlumniRegistrationSchema;

export const AlumniForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, updateData] = useReducer(
    (
      state: AlumniRegistrationSchema,
      update: Partial<AlumniRegistrationSchema>,
    ) => ({
      ...state,
      ...update,
    }),
    { ...defaultValues },
  );

  useEffect(() => {
    try {
      // TODO: extract into function, so we can reuse it
      const loadedData = alunmiRegistrationSchema
        .partial()
        .parse(
          JSON.parse(localStorage.getItem("alumniRegistrationData") ?? "{}"),
        );
      const localStorageCurrentStep = z
        .object({
          currentStep: z.number(),
        })
        .parse(
          JSON.parse(
            localStorage.getItem("alumniRegistrationDataCurrentStep") ?? "{}",
          ),
        ).currentStep;

      updateData(loadedData);
      setCurrentStep(localStorageCurrentStep);
    } catch (e) {
      localStorage.removeItem("alumniRegistrationDataCurrentStep");
      localStorage.removeItem("alumniRegistrationData");
    }
  }, []);

  function handleNext(stepData: Partial<AlumniRegistrationSchema>) {
    const loadedData = alunmiRegistrationSchema
      .partial()
      .parse(
        JSON.parse(localStorage.getItem("alumniRegistrationData") || "{}"),
      );

    localStorage.setItem(
      "alumniRegistrationData",
      JSON.stringify({
        ...loadedData,
        ...stepData,
      }),
    );

    localStorage.setItem(
      "alumniRegistrationDataCurrentStep",
      JSON.stringify({ currentStep: currentStep + 1 }),
    );

    updateData(stepData);
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrev() {
    localStorage.setItem(
      "alumniRegistrationDataCurrentStep",
      JSON.stringify({ currentStep: currentStep - 1 }),
    );
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleSubmit(stepData: Partial<AlumniRegistrationSchema>) {
    updateData(stepData);
    const updatedData = { ...formData, ...stepData };
    const response = await registerAlumni(updatedData);
    try {
      if (response.success) {
        alert("Успешно се регистрирахте!");
        localStorage.removeItem("alumniRegistrationDataCurrentStep");
        localStorage.removeItem("alumniRegistrationData");
        router.refresh();
      } else {
        alert(response.error);
      }
    } catch (e) {
      alert(
        "Възникна грешка при регистрацията. Моля, опитайте отново по-късно. Ако проблемът продължава, свържете се с нас на адрес hacktues@elsys-bg.org.",
      );
    }
  }

  return (
    <div className="space-y-1">
      <AlumniStep1
        className={currentStep === 1 ? "" : "hidden"}
        email={email}
        initialData={formData}
        defaultValues={defaultValues}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <AlumniStep2
        className={currentStep === 2 ? "" : "hidden"}
        email={email}
        defaultValues={defaultValues}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <EveryoneStep3
        className={currentStep === 3 ? "" : "hidden"}
        email={email}
        defaultValues={defaultValues}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <EveryoneStep4
        className={currentStep === 4 ? "" : "hidden"}
        email={email}
        isAlumni={true}
        defaultValues={defaultValues}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <AlumniStep5
        className={currentStep >= 5 ? "" : "hidden"}
        email={email}
        defaultValues={defaultValues}
        isAlumni={true}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleSubmit}
      />
      <div className="py-5">
        <Separator />
      </div>
      {/* FIXME: hardcoded count */}
      <p className="text-center text-sm text-muted-foreground">
        Стъпка {currentStep}/5
      </p>
      <p className="text-center text-sm text-muted-foreground">
        При проблеми с регистрацията се свържете с нас на адрес{" "}
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
