import { useState } from "react";

import { Progress } from "./progress";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";

/**
 * Props for the SignUpForm component.
 * Step state is lifted to the parent screen so the back button
 * can navigate between steps before exiting the screen entirely.
 */
interface SignUpFormProps {
  step: number;
  setStep: (step: number) => void;
}

/**
 * SignUpForm — Multi-step registration form orchestrator.
 *
 * Manages shared form data across two steps:
 *   Step 1: Personal info (name, email, university ID)
 *   Step 2: Password creation & confirmation
 *
 * A progress indicator is rendered below the active step
 * to show the user where they are in the flow.
 */
export function SignUpForm({ step, setStep }: SignUpFormProps) {
  // Shared form state — persists across step navigation so
  // users don't lose input when going back to step 1
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    universityId: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <>
      {/* Step 1: Personal information fields */}
      {step === 1 && (
        <StepOne
          data={formData}
          setData={setFormData}
          onNext={() => setStep(2)}
        />
      )}

      {/* Step 2: Password creation fields */}
      {step === 2 && (
        <StepTwo
          data={formData}
          setData={setFormData}
          onBack={() => setStep(1)}
        />
      )}

      {/* Dot progress indicator — always visible below the form */}
      <Progress currentStep={step} />
    </>
  );
}
