import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useCharacter } from "../canvas/character/useCharacter";
import {
  connectChat,
  disconnectChat,
  addChatSocketEvent,
} from "../../socket/chatSocket";
import { connectRoom, disconnectRoom } from "../../socket/roomSocket";
type SocketContextType = {
  connectChat: () => void;
  disconnectChat: () => void;
  chatSocket: Socket | null;
  participants: any[];
};
const SocketContext = createContext<SocketContextType>({
  connectChat: () => {},
  disconnectChat: () => {},
  chatSocket: null,
  participants: [],
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLogedIn } = useAuth();
  const [roomSocket, setRoomSocket] = useState<Socket | null>(null);
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);
  const [participants, setParticipants] = useState([]);

  const connectChat = () => {
    const chatSocket = io("http://127.0.0.1:3000/chat", {
      path: "/socket.io",
    });
    console.log("chat connect");

    setChatSocket(chatSocket);
    addChatSocketEvent(chatSocket);
  };

  const addChatSocketEvent = (socket: Socket) => {
    socket.on("join", (data: any) => {
      console.log(data);
      setParticipants(data.participants);
    });
  };
  const disconnectChat = () => {
    chatSocket?.disconnect();
  };

  useEffect(() => {
    if (isLogedIn) {
      connectRoom(setRoomSocket);
    }
    return () => {
      if (roomSocket) disconnectRoom(roomSocket);
    };
  }, [isLogedIn]);

  return (
    <SocketContext.Provider
      value={{ connectChat, disconnectChat, chatSocket, participants }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
