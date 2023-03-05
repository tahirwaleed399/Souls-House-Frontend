import StepEmail from "../Components/Steps/StepEmail/StepEmail";
import StepOtp from "../Components/Steps/StepOtp/StepOtp";
import React, { useState } from "react";
import { useAuthenticatedGuard } from "@/Hooks/UseAuthenticatedGuard";
import { useGuestGuard } from "@/Hooks/UseGuestGuard";
import StepPassword from "@/Components/Steps/StepPassword/StepPassword";

const Authenticate = () => {
  useGuestGuard();
  const steps: any = {
    1: StepEmail,
    2: StepPassword
    
  };

  const [step, setStep] = useState<number>(1);
  let Step = steps[step];
  function goNext() {
 
    if(!(step === Object.keys(steps).length)){
   setStep(step + 1);
    }
  }

  return (
    <div>
      <Step goNext={goNext} />
    </div>
  );
};

export default Authenticate;
