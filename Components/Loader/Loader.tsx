import { getLoaderState } from "@/Slices/loader";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
const Loader = () => {
  let showLoader = useSelector(getLoaderState);

  return (
    showLoader && (
      <div className="fixed top-0 left-0 h-full w-full bg-black flex flex-col justify-center items-center text-center gap-2 select-none z-50">
        <Image
          height={64}
          width={64}
          src="/Images/loader.gif"
          alt="Loader"
        ></Image>
        <h1>Please wait</h1>
      </div>
    )
  );
};

export default Loader;
