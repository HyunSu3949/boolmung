import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendChat } from "../../apis/room/sendChat";
import { ChatList } from "./ChatList";

type PropsType = {
  emitChat: (message: string) => void;
  chatList: any[];
};

export const ChatWindow = ({ emitChat, chatList }: PropsType) => {
  const { id: roomId = "" } = useParams();
  const [message, setMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;
    sendChat(roomId, message);
    emitChat(message);
    setMessage("");
  };

  return (
    <>
      <div>
        <ChatList chats={chatList} />
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" value={message} />
        <button>보내기</button>
      </form>
    </>
  );
};
