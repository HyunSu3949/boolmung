import React, { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
type SocketContextType = {
  connectChat: () => void;
  disconnectChat: () => void;
  chatSocket: Socket | null;
};
const SocketContext = createContext<SocketContextType>({
  connectChat: () => {},
  disconnectChat: () => {},
  chatSocket: null,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLogedIn } = useAuth();
  const [roomSocket, setRoomSocket] = useState<Socket | null>(null);
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);

  const connectRoom = () => {
    const roomSocket = io("http://127.0.0.1:3000/room", {
      path: "/socket.io",
    });
    setRoomSocket(roomSocket);
  };

  const disconnectRoom = () => {
    chatSocket?.disconnect();
  };

  const connectChat = () => {
    const chatSocket = io("http://127.0.0.1:3000/chat", {
      path: "/socket.io",
    });
    setChatSocket(chatSocket);
  };

  const disconnectChat = () => {
    chatSocket?.disconnect();
  };

  useEffect(() => {
    if (isLogedIn) {
      connectRoom();
    }
    return () => {
      disconnectRoom();
    };
  }, [isLogedIn]);

  return (
    <SocketContext.Provider value={{ connectChat, disconnectChat, chatSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
