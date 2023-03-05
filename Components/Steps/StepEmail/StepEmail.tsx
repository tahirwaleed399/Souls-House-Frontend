import Input from "@/Components/Input/Input";
import Image from "next/image";
import React, { useState } from "react";
import Card from "../../Card/Card";
import validator from "validator";
import { useSendOtpMutation } from "@/apis/otpApi";

import StepOtp from "../StepOtp/StepOtp";
import { useLoader } from "@/Hooks/useLoader";
interface PROPS {
  goNext: () => void;
}
const StepEmail = ({ goNext }: PROPS) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<null | string>("");

  function handleSubmission() {
    if (validator.isEmail(email)) {
      setError(null);
      localStorage.setItem('user_email', email);
      goNext();
    } else {
      setError("Email is not correct");
    }
  }
 
  return (
    <section className="page-height grid place-items-center">
   

      <Card>
        <div>
          <div className="center-me gap-2">
            <Image
              src={"/Images/email.svg"}
              width={25}
              height={25}
              alt="SVG EMOJI"
            ></Image>
            <h1 className="font-bold">Enter your email id</h1>
          </div>

          <Input
            type="text"
            required={true}
            placeholder="tahirwaleed399@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <small className="text-my-red relative -top-4">
            {typeof error === "string" && error}
          </small>
          <button onClick={handleSubmission} className="btn-primary mx-auto ">
            Next
          </button>
          <p className="normal-text text-center">
            By entering your email id, you’re agreeing to our Terms of Service
            and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </section>
  );
};

export default StepEmail;
