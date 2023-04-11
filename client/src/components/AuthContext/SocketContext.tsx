import React, { createContext, useContext, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLogedIn } = useAuth();
  const [chatSocket, setChatSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isLogedIn) {
      const chatSocket = io("http://127.0.0.1:3000/chat", {
        path: "/socket.io",
      });
      setChatSocket(chatSocket);
    }
  }, [isLogedIn]);

  return (
    <SocketContext.Provider value={chatSocket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
