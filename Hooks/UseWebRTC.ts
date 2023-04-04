import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./UseStateWithCallback";
import { isNativeError } from "util/types";
import { User } from "@/Interfaces/User";
import {Socket} from 'socket.io-client';
import {SocketInit} from '../utils/socket';
type AUDIOELEMENTS = { [key: string]: HTMLAudioElement };

let connectionMade = false ;
const socketUsers =  new Set();

export function useWebRTC(roomId: string, user: User) {
  const [clients, setClients] = useStateWithCallback<any>([]);
  const audioElements = useRef<AUDIOELEMENTS>({});
  const connections = useRef({});
  const socket = useRef<Socket|null>(null);
  const localMediaStream = useRef<null | MediaStream>(null);
  const clientsRef = useRef([]);
useEffect(()=>{
if(!connectionMade){
  socket.current = SocketInit();
}
  connectionMade = true ;

},[])

  const provideRef = (instance: HTMLAudioElement, userId: string) => {
    audioElements.current[userId.toString() as keyof AUDIOELEMENTS] = instance;
  };

  const startCapture = async () => {
    localMediaStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
  };

  const addNewClients = useCallback(
    (newClient: any, callback: () => void) => {
      const lookingFor = clients.find(
        (client: any) => client.id === newClient.id
      );

      if (!lookingFor) {
        setClients((existingClients: any) => {
          return [
            ...existingClients.filter(
              (client: any) => client.id !== newClient.id
            ),
            newClient,
          ];
        }, callback);
      }
    },
    [clients, setClients]
  );
  useEffect(() => {

    startCapture()
      .then(() => {
        addNewClients(user, () => {
       
          const localElement =
            audioElements.current[user.id as keyof AUDIOELEMENTS];
          if (localElement) {
            localElement.srcObject = localMediaStream.current;
            localElement.volume = 0;
          }
         
        if(socket.current && !socketUsers.has(user.id)){
          socket.current?.emit('join', { })
        }
        socketUsers.add(user.id);

        });
      })
      .catch(() => {});
  }, [addNewClients, user]);
  return [clients, provideRef];
}
