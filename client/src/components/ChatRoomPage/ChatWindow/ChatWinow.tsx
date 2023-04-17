import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendChat } from "../../../apis/room/sendChat";
import { ChatList } from "./ChatList";
import "./ChatWindow.css";

export const ChatWindow = ({ chatList }: any) => {
  const { id: roomId = "" } = useParams();
  const [message, setMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;

    sendChat(roomId, message);
    setMessage("");
  };

  return (
    <div className="chatWindow">
      <div className="chatListBox">
        <ChatList chatList={chatList} />
      </div>
      <form onSubmit={onSubmit} className="chatForm">
        <input
          onChange={onChange}
          type="text"
          value={message}
          className="chatInput"
        />
        <button className="chatButton">입력</button>
      </form>
    </div>
  );
};
