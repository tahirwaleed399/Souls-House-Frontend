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
const StepPassword = ({ goNext }: PROPS) => {
  const email : string|null = localStorage.getItem('user_email');
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<null | string>("");
  const [sendOtp, state]: any = useSendOtpMutation();
  useLoader(state, { loading: "Sending Otp", success: "Sent" }, onSuccess);
  const [openOtp, setOpenOtp] = useState<boolean>(false);

  function handleSubmission() {
    if (validator.isLength(password, {
      min: 8 , max: 50 
    })) {
      setError(null);

      sendOtp({ email , password });
      setOpenOtp(true);
    } else {
      setError("Password should atleast 8 characters long");
    }
  }
  function onSuccess() {
    let {
      data: { data : {otpToken} },
    } = state;
    localStorage.setItem('otpToken', otpToken);
  }
  return (
    <section className="page-height grid place-items-center">
      <StepOtp
        setOpen={setOpenOtp}
        open={openOtp}
        onOpen={() => {}}
        onClose={() => setOpenOtp(false)}
      />

      <Card>
        <div>
          <div className="center-me gap-2">
            <Image
              src={"/Images/key.png"}
              width={25}
              height={25}
              alt="SVG EMOJI"
            ></Image>
            <h1 className="font-bold">Enter your secure password</h1>
          </div>

          <Input
            type="password"
            required={true}
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <small className="text-my-red relative -top-4">
            {typeof error === "string" && error}
          </small>
          <button onClick={handleSubmission} className="btn-primary mx-auto ">
           Create Account
          </button>
  
        </div>
      </Card>
    </section>
  );
};

export default StepPassword;
