import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../AuthContext/AuthContext";

const Url = "http://127.0.0.1:3000/chat";
const Path = "/socket.io";

const connectChat = () => {
  const chatSocket = io(Url, {
    path: Path,
  });
  return chatSocket;
};

type Chat = {
  name: string;
  message: string;
};

export const useChatSocket = (roomId: string) => {
  const [chatSocket, setChatSocket] = useState<Socket>();
  const [usersInfo, setUsersInfo] = useState([]);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { currentUser } = useAuth();

  const connectChat = () => {
    const chatSocket = io(Url, {
      path: Path,
    });
    return chatSocket;
  };

  const joinCallback = (data: any) => {
    setUsersInfo(data);
  };

  const chatCallback = (data: any) => {
    setChatList((prev) => [...prev, data.message]);
  };

  const emitChat = (message: string) => {
    if (chatSocket)
      chatSocket.emit("chat", { name: currentUser.name, message });
  };
  useEffect(() => {
    const chatSocket = connectChat();
    setChatSocket(chatSocket);

    chatSocket.on("join", joinCallback);
    chatSocket.on("chat", chatCallback);

    return () => {
      chatSocket.disconnect();
    };
  }, []);

  return { chatSocket, emitChat, chatList, usersInfo };
};
