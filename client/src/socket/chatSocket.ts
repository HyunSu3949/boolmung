import { io, Socket } from "socket.io-client";
import { Dispatch } from "react";

const Url = "http://127.0.0.1:3000/chat";
const Path = "/socket.io";

export const connectChat = (setSocketState: Dispatch<Socket>) => {
  const chatSocket = io(Url, {
    path: Path,
  });

  setSocketState(chatSocket);
};

export const disconnectChat = (socket: Socket) => {
  socket?.disconnect();
};

type PositionInfo = {
  user: string;
  position: number[];
};

export const addChatSocketEvent = (socket: Socket, setUsers: Dispatch<any>) => {
  socket.on("join", (data: any) => {
    setUsers(data.participants);
  });

  socket.on("chat", (data: any) => {
    // chat 세팅
  });

  socket.on("move", (data: PositionInfo) => {
    //user 포지션 세팅

    console.log(data);
  });
};
