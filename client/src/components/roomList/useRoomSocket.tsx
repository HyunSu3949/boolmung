import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const Url = "http://127.0.0.1:3000/room";
const Path = "/socket.io";

export const useRoomSocket = () => {
  const [roomSocket, setRoomSocket] = useState<Socket>();

  const connectRoom = () => {
    const roomSocket = io(Url, {
      path: Path,
    });
    setRoomSocket(roomSocket);
  };

  const disconnectChat = () => {
    roomSocket?.disconnect();
  };

  const addSocketEvent = () => {
    roomSocket?.on("enter", enterCallback);
  };

  const removeSocketEvent = () => {
    roomSocket?.off("enter", enterCallback);
  };

  const enterCallback = () => {};
  useEffect(() => {
    if (!roomSocket) connectRoom();

    addSocketEvent();

    return () => {
      disconnectChat();
      removeSocketEvent();
    };
  }, [roomSocket]);

  return {};
};
