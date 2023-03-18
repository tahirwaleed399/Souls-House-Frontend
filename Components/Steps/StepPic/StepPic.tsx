import Input from "@/Components/Input/Input";
import Image from "next/image";
import React, { useState } from "react";
import Card from "../../Card/Card";
import validator from "validator";
import { useActivateUserMutation, useSendOtpMutation } from "@/apis/authApi";

import StepOtp from "../StepOtp/StepOtp";
import { useLoader } from "@/Hooks/useLoader";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "@/Slices/auth";
import { User } from "@/Interfaces/User";
import { useRouter } from "next/router";

interface PROPS {
  goNext: () => void;
}
const StepPic = ({ goNext }: PROPS) => {
  const [profile, setProfile] = useState<string | null>();
  const [error, setError] = useState<null | string>("");
  const  [activateUser , state]  = useActivateUserMutation();
  const userName = localStorage.getItem('user_name');
  const router = useRouter();
  let user : User=  useSelector(getUser);
  const dispatch = useDispatch();
 function onActivate(){
    const user : User = state.data.data.user ;
    dispatch(setUser(user));
  //  setTimeout(()=>{
  //   router.push('/rooms')
  //  },10000)
  }
 
  useLoader(state , {loading : 'Activating You Please Wait' , success : 'Congrats 🎉 You are activated Successfully'} , onActivate )

  
  function handleProfile(e:any){
    const reader = new FileReader();

    reader.onload = ()=>{
    if(reader.result){
      console.log(reader.result)
      setProfile(reader.result as string);
    }
    }
    if(e.target.files.length > 0){
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  function handleSubmission() {
      
    activateUser({
      name : userName,
      profile ,
      userId : user.id,
    })
  }
 
  return (
    <section className="page-height grid place-items-center">

      <Card>
        <div>
          <div className="center-me gap-2">
            <Image
              src={"/Images/monkey.svg"}
              width={25}
              height={25}
              alt="SVG EMOJI"
            ></Image>
            <h1 className="font-bold">Okay, {userName}</h1>

          </div>
            <small className="text-center text-my-text-secondary block mt-2 mb-4 w-full">How’s this photo?</small>

          {/* <Input
            type="text"
            required={true}
            placeholder="Waleed Tahir"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input> */}

          <label htmlFor="selectPic" className="cursor-pointer h-40 w-40 border-4 border-my-blue rounded-full center-me my-4">
{
  !profile &&  <p>Select</p>
}
{
  profile && <Image src={profile} alt="Profile Image" width={50} height={50} className='h-full w-full rounded-full'/>
}
          </label>
          <input accept="image/*"  onChange={handleProfile} type="file"  id='selectPic' className="hidden" />
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

export default StepPic;
