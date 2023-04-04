import StepEmail from "../Components/Steps/StepEmail/StepEmail";
import StepOtp from "../Components/Steps/StepOtp/StepOtp";
import React, { useState } from "react";
import StepName from "@/Components/Steps/StepName/StepName";
import StepPic from "@/Components/Steps/StepPic/StepPic";
import { useAuthenticatedGuard } from "@/Hooks/UseAuthenticatedGuard";

const Activate = () => {
  useAuthenticatedGuard();
  const steps: any = {
    1: StepName,
    2: StepPic,
  };

  const [step, setStep] = useState<number>(1);
  let Step = steps[step];
  function goNext() {
 
    if(!(step === Object.keys(steps).length)){
   setStep(step + 1);
    }
  }

  return (
    <div className="avtivate">
      <Step goNext={goNext} />
    </div>
  );
};

export default Activate;
