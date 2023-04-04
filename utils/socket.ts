import { io } from "socket.io-client";
import { backendUrl, backendUrlWithoutApi } from "./backendUrl";

export const SocketInit = () => {
  const options = {
    "force new connection": true,
    reconnectionAttemp: "Infinity",
    timeout: 10000,

    transports: ["websocket"],
  };
  return io(backendUrlWithoutApi, options);
};


