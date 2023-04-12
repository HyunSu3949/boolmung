import { io, Socket } from "socket.io-client";
import { Dispatch } from "react";

const Url = "http://127.0.0.1:3000/room";
const Path = "/socket.io";

export const connectRoom = (setSocketState: Dispatch<Socket>) => {
  const roomSocket = io(Url, {
    path: Path,
  });

  setSocketState(roomSocket);
};

export const disconnectRoom = (socket: Socket) => {
  socket?.disconnect();
};
