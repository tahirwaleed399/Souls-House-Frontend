import { Room } from "@/Interfaces/Room";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface PROPS {
  room : Room
}
const RoomCard = ({room}:PROPS) => {
  return (
   <Link href={`rooms/${room.id}`}>
     <article className="room-card p-5 bg-my-bg-secondary rounded-md max-w-full w-72 ">
      <header>
        <h2 className="">{room.topic}</h2>
      </header>
      <main className="grid grid-cols-2 my-3">
        <div className="images">
          <div className="set-2 relative ">
            
           {   room.speakers.map((speaker,index:number)=><Image
           key={speaker.id as any}
              className={classNames("absolute  rounded-full border-2" , index===0 ?'border-my-green':'',index===1 ?'border-my-red top-7 left-3':'',index===2 ?'border-my-indigo top-5 -left-3':'')}
              src="/Images/dummy.svg"
              height={30}
              width={30}
              alt="perosn"
            ></Image>)
            }
         
           
          </div>
        </div>
        <div className="names">
        {   room.speakers.map((speaker,index:number)=>{
          return <div key={speaker.id as any} className="name flex my-1 text-my-text-secondary gap-1 items-center text-xs">
          <span>{speaker.name.toUpperCase()}</span>
          <Image
            src="/Images/message.svg"
            height={10}
            width={10}
            alt="Message Icon"
          ></Image>
        </div> 
        })
            }
                   
        </div>
      </main>
      <footer className=" flex align-bottom items-end justify-end ">
        <div className="total flex items-center gap-1">
            <span className="text-xs">{room.speakers.length}</span>
            <Image src="/Images/man.svg" alt="Man" height={15} width={15}></Image>
        </div>
      </footer>
    </article>
   </Link>
  );
};

export default RoomCard;
