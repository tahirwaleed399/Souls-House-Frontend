import { useCreateRoomMutation, useGetRoomsQuery } from "@/apis/roomApi";
import Input from "@/Components/Input/Input";
import RoomCard from "@/Components/RoomCard/RoomCard";
import { useActivatedGuard } from "@/Hooks/UseActivatedGuard";
import { useLoader } from "@/Hooks/useLoader";
import classNames from "classnames";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Popup from "reactjs-popup";
import Skeleton from 'react-loading-skeleton'
import { Room } from "@/Interfaces/Room";
const Rooms = () => {
  useActivatedGuard();
  const [openRoomModal, setOpenRoomModal] = useState<boolean>(false);
  const {data, isLoading,isSuccess} = useGetRoomsQuery();
  return (
    <section>
      
      <header className="flex w-full items-center justify-between">
        <div className="flex w-1/2 items-center ">
          <h1 className="font-bold line-after">All Voice Rooms</h1>
          <div className="ml-6">
            <Input
              type={"text"}
              placeholder="Search"
              className="text-left"
            ></Input>
          </div>
        </div>
        <button
          onClick={() => setOpenRoomModal(true)}
          className="btn-success flex gap-2 items-center "
        >
          <Image
            src="/Images/person.svg"
            alt="Person Room create"
            width={20}
            height={20}
          ></Image>{" "}
          <span>Create a Room</span>
        </button>
      </header>

      <section className="flex gap-2 gap-y-8 items-center justify-around flex-wrap">
{
  isLoading && <>
      <Skeleton borderRadius={5}  height={211} width={304} enableAnimation baseColor='#1D1D1D' highlightColor="#0077ff14" inline={true} style={{margin:'0px 20px'}} />
      <Skeleton borderRadius={5}  height={211} width={304} enableAnimation baseColor='#1D1D1D' highlightColor="#0077ff14" inline={true} style={{margin:'0px 20px'}} />
      <Skeleton borderRadius={5}  height={211} width={304} enableAnimation baseColor='#1D1D1D' highlightColor="#0077ff14" inline={true} style={{margin:'0px 20px'}} />
      <Skeleton borderRadius={5}  height={211} width={304} enableAnimation baseColor='#1D1D1D' highlightColor="#0077ff14" inline={true} style={{margin:'0px 20px'}} />
      <Skeleton borderRadius={5}  height={211} width={304} enableAnimation baseColor='#1D1D1D' highlightColor="#0077ff14" inline={true} style={{margin:'0px 20px'}} />
      <Skeleton borderRadius={5}  height={211} width={304} enableAnimation baseColor='#1D1D1D' highlightColor="#0077ff14" inline={true} style={{margin:'0px 20px'}} /></>
}
{
  isSuccess && data &&  data.data.rooms.map((room:Room)=><RoomCard room={room} key={room.id}/>)
}

      </section>
      <RoomModal
        setOpen={openRoomModal}
        open={openRoomModal}
        onOpen={() => {}}
        onClose={() => setOpenRoomModal(false)}
      />
    </section>
  );
};
interface ModalProps {
  open: boolean;
  setOpen: any;
  onClose: () => void;
  onOpen: () => void;
}
const RoomModal = ({ open, setOpen, onClose, onOpen }: ModalProps) => {

  interface type {
    name : 'public' | 'closed'| 'social',
    image :String
  }
  const types:type[] = [
    {
      name :'public',
      image : '/Images/earth.svg'
    },   {
      name :'closed',
      image : '/Images/closed.svg'
    },   {
      name :'social',
      image : '/Images/social.svg'
    },
  ];
  const [selectedType , setSelectedType] = useState<'public' | 'closed'| 'social'>('public');
  const [topic , setTopic] = useState<string>('');
  const [createRoom , createRoomState ] = useCreateRoomMutation();

  useLoader(createRoomState ,{loading : 'Creating the room', success :"Room Created"});
function handleCreateRoom(event:any){
  toast.dismiss();
if(topic.length > 1) {
  console.log(
    {topic , type :selectedType}
  );
  createRoom({topic , type :selectedType});

}else{
  toast.error('Enter a valid topic kindly 😊')
}
}
  return (
    <>
      <Popup open={open} onClose={onClose}>
        <div className="p-2">
          <h1 className="text-left">Enter the topic to be disscussed</h1>
          <Input className="w-full my-3 text-left" value={topic} onChange={(e)=>setTopic(e.target.value)}></Input>
          <h1 className="text-left">Room Type</h1>
          <div className="flex gap-5 items-center justify-between">
          {
            types.map((type)=>{
              return    <div onClick={()=>setSelectedType(type.name)} key={type.name} className={classNames("flex flex-col items-center justify-between my-3  py-5 px-8 rounded cursor-pointer  transition-colors" , selectedType===type.name ? 'bg-my-bg-secondary':'')}>
              <Image
                src={type.image as any}
                height={50}
                width={50}
                alt="Earth"
              ></Image>
              <span className="font-semibold mt-2 capitalize">{type.name}</span>
            </div>
            })
          }
          </div>
          <hr className="border my-5 border-t-my-bg-secondary" />
          <p className="text-center font-normal">
          Start a room, open to everyone
          </p>
<button className="btn-success center-me gap-2 mx-auto my-6" onClick={handleCreateRoom}>
  <Image src={'/Images/congrats.svg'} alt='happy' height={17} width={17}></Image>
  <span>Lets Go</span>
</button>
        </div>
      </Popup>
    </>
  );
};
export default Rooms;
