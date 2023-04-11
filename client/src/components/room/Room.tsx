import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendChat } from "../../apis/room/sendChat";
import { useSocket } from "../AuthContext/SocketContext";

export const Room: React.FC = () => {
  const [chats, setChats] = useState([]);
  const chatSocket = useSocket();
  const [text, setText] = useState("");
  const { id = "" } = useParams();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendChat(id, text);
  };
  useEffect(() => {
    chatSocket?.on("chat", (data) => {
      console.log(data);
    });
  }, []);
  return (
    <>
      <div></div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" />
        <button>보내기</button>
      </form>
    </>
  );
};
