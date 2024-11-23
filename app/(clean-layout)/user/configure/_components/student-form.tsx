"use client";

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { HT_CONTACT_EMAIL } from "~/app/_configs/hackathon";
import { IfHTFeatureOff, IfHTFeatureOn } from "~/app/_integrations/components";
import { Card } from "~/app/components/ui/card";
import { useToast } from "~/app/components/ui/use-toast";
import { registerStudent } from "../actions";
import {
  StudentRegistrationSchema,
  studentRegistrationSchema,
} from "../schemas";
import { LoggedInAsChip, StudentStep1 } from "./steps/step1";
import { StudentStep2 } from "./steps/step2";
import { EveryoneStep3 } from "./steps/step3";
import { EveryoneStep4 } from "./steps/step4";

const defaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  regulationAgreement: false,
  publicDataConsent: false,
  personalDataConsent: false,
  grade: "" as any, // zod does validation on this
  parallel: "" as any, // ...and this
  allergies: "",
  tShirtId: -10,
  technologies: "",
  isLookingForTeam: true,
} satisfies StudentRegistrationSchema;

export const StudentForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, updateData] = useReducer(
    (
      state: StudentRegistrationSchema,
      update: Partial<StudentRegistrationSchema>,
    ) => ({
      ...state,
      ...update,
    }),
    { ...defaultValues },
  );

  useEffect(() => {
    try {
      // TODO: extract into function, so we can reuse it
      const loadedData = studentRegistrationSchema
        .partial()
        .parse(
          JSON.parse(localStorage.getItem("studentRegistrationData") ?? "{}"),
        );
      const localStorageCurrentStep = z
        .object({
          currentStep: z.number(),
        })
        .parse(
          JSON.parse(
            localStorage.getItem("studentRegistrationDataCurrentStep") ?? "{}",
          ),
        ).currentStep;

      updateData(loadedData);
      setCurrentStep(localStorageCurrentStep);
    } catch (e) {
      localStorage.removeItem("studentRegistrationDataCurrentStep");
      localStorage.removeItem("studentRegistrationData");
    }
  }, []);

  function handlePrev() {
    localStorage.setItem(
      "studentRegistrationDataCurrentStep",
      JSON.stringify({ currentStep: currentStep - 1 }),
    );
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  function handleNext(stepData: Partial<StudentRegistrationSchema>) {
    const loadedData = studentRegistrationSchema
      .partial()
      .parse(
        JSON.parse(localStorage.getItem("studentRegistrationData") || "{}"),
      );

    localStorage.setItem(
      "studentRegistrationData",
      JSON.stringify({
        ...loadedData,
        ...stepData,
      }),
    );

    localStorage.setItem(
      "studentRegistrationDataCurrentStep",
      JSON.stringify({ currentStep: currentStep + 1 }),
    );

    updateData(stepData);
    setCurrentStep((prev) => prev + 1);
  }

  async function handleSubmit(stepData: Partial<StudentRegistrationSchema>) {
    updateData(stepData);
    const updatedData = { ...formData, ...stepData };
    toast({
      title: "Регистрира се профил на ученика...",
    });
    const response = await registerStudent(updatedData);
    try {
      if (response.success) {
        toast({ title: "Успешно се регистрирахте!" });
        localStorage.removeItem("studentRegistrationDataCurrentStep");
        localStorage.removeItem("studentRegistrationData");
        router.refresh();
      } else {
        toast({
          title: "Възникна грешка",
          description: response.error,
        });
      }
    } catch (e) {
      toast({
        title: "Възникна грешка при регистрацията",
        description: `Моля, опитайте отново по-късно. Ако проблемът продължава, свържете се с нас на адрес ${HT_CONTACT_EMAIL}`,
      });
    }
  }

  return (
    <div className="flex h-full flex-col gap-1">
      <IfHTFeatureOn feature="register-students">
        <StudentStep1
          className={currentStep === 1 ? "" : "hidden"}
          email={email}
          defaultValues={defaultValues}
          initialData={formData}
          onPrev={handlePrev}
          onNext={handleNext}
        />
        <StudentStep2
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
          onNext={handleSubmit}
        />
      </IfHTFeatureOn>
      <IfHTFeatureOff feature="register-students">
        <Card className="max-w-sm p-3 text-center">
          <p className="text-muted-foreground">
            Регистрацията на настоящи ученици още не е отворена.{" "}
            {/* TODO: add actual link here */}
            {/* Следете ни в социалните мрежи за повече информация. */}
          </p>
        </Card>
      </IfHTFeatureOff>
    </div>
  );
};
