import Input from "@/Components/Input/Input";
import Image from "next/image";
import React, { useState } from "react";
import Card from "../../Card/Card";
import validator from "validator";
import { useSendOtpMutation } from "@/apis/authApi";

import StepOtp from "../StepOtp/StepOtp";
import { useLoader } from "@/Hooks/useLoader";
interface PROPS {
  goNext: () => void;
}
const StepName = ({ goNext }: PROPS) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<null | string>("");

  function handleSubmission() {
    if (validator.isLength(name , {
      min: 3
    } )) {
      setError(null);
      localStorage.setItem('user_name', name);
      goNext();
    } else {
      setError("Name is not valid");
    }
  }
 
  return (
    <section className="page-height grid place-items-center">
   

      <Card>
        <div>
          <div className="center-me gap-2">
            <Image
              src={"/Images/name.svg"}
              width={25}
              height={25}
              alt="SVG EMOJI"
            ></Image>
            <h1 className="font-bold">Enter your Name</h1>
          </div>

          <Input
            type="text"
            required={true}
            placeholder="Waleed Tahir"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
          <small className="text-my-red relative -top-4">
            {typeof error === "string" && error}
          </small>
          <button onClick={handleSubmission} className="btn-primary mx-auto ">
            Next
          </button>
        </div>
      </Card>
    </section>
  );
};

export default StepName;
