import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../common/Context/AuthContext";
import { useParams } from "react-router-dom";

const Url = "http://127.0.0.1:3000/chat";
const Path = "/socket.io";

type Chat = {
  _id: string;
  type: "system" | "mine" | "others" | undefined;
  name: string;
  message: string;
};

export const useChatSocket = () => {
  const [chatSocket, setChatSocket] = useState<Socket>();
  const [actionInfo, setActionInfo] = useState({});
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { currentUser } = useAuth();
  const { id } = useParams();

  const connectChat = () => {
    const chatSocket = io(Url, {
      path: Path,
    });
    chatSocket.emit("join", {
      userId: currentUser._id,
      roomId: id,
      name: currentUser.name,
    });
    setChatSocket(chatSocket);
  };

  const joinCallback = (data: any) => {
    console.log(data);
  };

  const chatCallback = (data: Chat) => {
    console.log(data);
    console.log(data._id, currentUser._id);

    if (data._id === currentUser._id) {
      data.type = "mine";
    } else if (data._id !== currentUser._id) {
      data.type = "others";
    } else if (data.type) {
      data.type = "system";
    }
    setChatList((prev) => [...prev, data]);
  };

  const moveCallback = (data: any) => {
    setActionInfo(data);
  };

  const disconnectChat = () => {
    chatSocket?.disconnect();
  };

  const addSocketEvent = () => {
    chatSocket?.on("join", joinCallback);
    chatSocket?.on("chat", chatCallback);
    chatSocket?.on("move", moveCallback);
  };

  const removeSocketEvent = () => {
    chatSocket?.off("join", joinCallback);
    chatSocket?.off("chat", chatCallback);
    chatSocket?.off("move", moveCallback);
  };

  useEffect(() => {
    if (!chatSocket) connectChat();

    addSocketEvent();

    return () => {
      disconnectChat();
      removeSocketEvent();
    };
  }, [chatSocket]);
  return {
    chatSocket,
    chatList,
    actionInfo,
    connectChat,
    addSocketEvent,
    disconnectChat,
  };
};
