import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../AuthContext/AuthContext";
import { useParams } from "react-router-dom";

const Url = "http://127.0.0.1:3000/chat";
const Path = "/socket.io";

type Chat = {
  room: string;
  user: string;
  message: string;
};

export const useChatSocket = () => {
  const [chatSocket, setChatSocket] = useState<Socket>();
  const [usersInfo, setUsersInfo] = useState({});
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { currentUser } = useAuth();
  const { id } = useParams();

  const connectChat = () => {
    const chatSocket = io(Url, {
      path: Path,
    });
    chatSocket.emit("join", { userId: currentUser._id, roomId: id });
    setChatSocket(chatSocket);
  };

  const joinCallback = (data: any) => {
    setUsersInfo(data);
  };

  const chatCallback = (data: Chat) => {
    console.log(data);

    setChatList((prev) => [...prev, data]);
  };

  const moveCallback = (data: any) => {
    console.log(data);

    setUsersInfo({ ...usersInfo, ...data });
  };

  const emitMove = (userId: string, position: any) => {
    chatSocket?.emit("move", { [userId]: position });
  };

  const disconnectChat = () => {
    console.log("dis!!!");

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
    usersInfo,
    connectChat,
    addSocketEvent,
    emitMove,
    disconnectChat,
  };
};
