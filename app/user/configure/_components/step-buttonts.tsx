import { ArrowRightIcon } from "lucide-react";

import { Button } from "~/app/components/ui/button";

export const StepButtons = ({
  left,
  right,
}: {
  left?: React.ReactNode;
  right?: React.ReactNode;
}) => {
  return (
    <div className="mt-4 flex justify-between">
      {left}
      <div className="w-full flex-1" />
      {right}
    </div>
  );
};

export const NextStepButton = ({
  isLastStep = false,
  isLoading = false,
  disabled = false,
}: {
  isLastStep?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Button
      type="submit"
      className="flex items-center space-x-2"
      disabled={disabled || isLoading}
    >
      <span>{isLastStep ? "Завърши" : "Продължи"}</span>
      {!isLastStep && <ArrowRightIcon className="h-4 w-4" />}
    </Button>
  );
};

export const PrevStepButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button type="button" variant="secondary">
      Назад
    </Button>
  );
};
