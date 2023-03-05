import Card from '@/Components/Card/Card'
import Input from '@/Components/Input/Input'
import Image from 'next/image'
import React, { useState } from 'react';
import dynamic from "next/dynamic";
const Popup = dynamic(import('reactjs-popup'), { ssr: false })
import "reactjs-popup/dist/index.css";
import { useVerifyOtpMutation } from '@/apis/otpApi';
import { useLoader } from '@/Hooks/useLoader';
import { toast } from 'react-hot-toast';
interface PROPS  {
  open: boolean;
  setOpen: any;
  onClose: () => void;
  onOpen: () => void;
}

const StepOtp = ({
  open,
  setOpen,
  onClose
}: PROPS ) => {


const [otp, setOtp] =  useState<number>();
  const [verifyOtp , state]= useVerifyOtpMutation();
  useLoader(state , {loading:"Verifying Please Wait 😊" , success : "Otp Verified"})
 const handleSubmit = ()=>{
if(otp) {
  if(otp > 1000 ){
    let otpToken = localStorage.getItem('otpToken');
if(otpToken){

  verifyOtp({pureOtp:otp,otpToken});
  console.log({pureOtp:otp,otpToken})
}else {
  toast.error('Token Not Available Try Again')
}
  }
}
 }

  return (
   

  <Popup
    open={open}
    position="right center"
    onClose={onClose}
    closeOnDocumentClick={false}
  >

      <div className="py-5 px-5">
        <div className="center-me gap-2">
          <Image
            src={"/Images/lock.svg"}
            width={25}
            height={25}
            alt="LOCK EMOJI"
          ></Image>
          <h1 className="font-bold">Enter the code we just mailed you</h1>
        </div>

        <div className='max-w-xs grid place-items-center mx-auto'>
        <Input
          type="number"
          required={true}
          placeholder="****"
          max={4}
          min={4}
          value={otp}
          onChange={(e)=>setOtp(parseInt(e.target.value))}
        
        ></Input>
        </div>
        <p className="normal-text text-center">
       Didn’t receive? <a> Tap to resend</a>
        </p>
        <button onClick={handleSubmit} className="btn-primary mx-auto ">Next</button>
      </div>


  </Popup>
);}

export default StepOtp