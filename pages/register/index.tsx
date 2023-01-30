import StepEmail from '../../Components/StepEmail/StepEmail'
import StepName from '../../Components/StepName/StepName'
import StepOtp from '../../Components/StepOtp/StepOtp'
import StepPic from '../../Components/StepPic/StepPic'
import StepUsername from '../../Components/StepUsername/StepUsername'
import React, { useState } from 'react'


const Register = () => {
  const steps :any={
    1:StepEmail,
    2 : StepOtp,
    3: StepName,
    4 : StepPic,
    5: StepUsername,
  }
  
  const [step , setStep ]= useState<number>(1);
  
let Step = steps[step];
  return (
    <div>
{<Step step={step} setStep={setStep}/>}


    </div>
  )
}

export default Register