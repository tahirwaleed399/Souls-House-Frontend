import StepEmail from "../Components/Steps/StepEmail/StepEmail";
import StepOtp from "../Components/Steps/StepOtp/StepOtp";
import React, { useState } from "react";
import StepName from "@/Components/Steps/StepName/StepName";
import StepPic from "@/Components/Steps/StepPic/StepPic";
import StepUsername from "@/Components/Steps/StepUsername/StepUsername";
import { useAuthenticatedGuard } from "@/Hooks/UseAuthenticatedGuard";

const Activate = () => {
  useAuthenticatedGuard();
  const steps: any = {
    1: StepName,
    2: StepPic,
    3: StepUsername,
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

export default Activate;
