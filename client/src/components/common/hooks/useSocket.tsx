import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.DEV_SOCKET_DOMAIN;
} else {
  baseURL = "";
}

type PropsType = {
  nameSpace: string;
};

export const useSocket = ({ nameSpace }: PropsType) => {
  const [socket, setSocket] = useState<Socket>();

  const connectNameSpace = () => {};

  const addSocketEvent = () => {};

  const removeSocketEvent = () => {};

  useEffect(() => {}, [socket]);
};
