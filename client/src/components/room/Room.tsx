import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendChat } from "../../apis/room/sendChat";
import { useAuth } from "../AuthContext/AuthContext";
import { ChatList } from "./ChatList";
import { useSocket } from "../AuthContext/SocketContext";

type Chat = {
  name: string;
  message: string;
};

export const Room: React.FC = () => {
  const { connectChat, disconnectChat, chatSocket } = useSocket();
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const { id: roomId = "" } = useParams();
  const { currentUser } = useAuth();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChat(roomId, message);
    chatSocket?.emit("chat", { name: currentUser.name, message });
  };

  useEffect(() => {
    if (!chatSocket) {
      connectChat();
      return;
    }

    chatSocket.emit("join", { roomId, userId: currentUser._id });

    chatSocket.on("chat", (data) => {
      setChats((prev) => [...prev, data.message]);
    });

    return () => {
      disconnectChat();
    };
  }, [chatSocket]);
  return (
    <>
      <div>
        <ChatList chats={chats} />
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" />
        <button>보내기</button>
      </form>
    </>
  );
};
