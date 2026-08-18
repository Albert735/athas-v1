import { useState } from "react";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import type { StepOneData } from "@/schemas/auth";

interface SignUpFormProps {
  step: number;
  setStep: (step: number) => void;
}

export function SignUpForm({ step, setStep }: SignUpFormProps) {
  const [stepOneData, setStepOneData] = useState<StepOneData | null>(null);

  return step === 1 ? (
    <StepOne
      onNext={(data) => {
        setStepOneData(data);
        setStep(2);
      }}
    />
  ) : (
    <StepTwo stepOneData={stepOneData} onBack={() => setStep(1)} />
  );
}
