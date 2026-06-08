import { useState } from "react";

import { Progress } from "./progress";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";

export function SignUpForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    universityId: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <>
      {step === 1 && (
        <StepOne
          data={formData}
          setData={setFormData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepTwo
          data={formData}
          setData={setFormData}
          onBack={() => setStep(1)}
        />
      )}

      <Progress currentStep={step} />
    </>
  );
}
