import React, { useEffect } from 'react';
import {useRouter} from "next/router";
import { useWebRTC } from '@/Hooks/UseWebRTC';
import { useSelector } from 'react-redux';
import { getUser } from '@/Slices/auth';
import { useStateWithCallback } from '@/Hooks/UseStateWithCallback';
import { useActivatedGuard } from '@/Hooks/UseActivatedGuard';
import { SocketInit } from '@/utils/socket';

const Room = () => {
  useActivatedGuard();

    const { query } = useRouter();
   
    const user= useSelector(getUser);
    const [clients ,provideRef]=useWebRTC(query.roomId as string, user); 

  return (
    <div>

{
clients.map((client:any)=>(<div key={client.id}>
<audio ref={(instance)=> provideRef(instance, client.id)} controls autoPlay></audio>
<span>{client.name}</span>
</div>))
}
    </div>
  )
}

export default Room