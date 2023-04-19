import React, { useEffect } from "react";
import { ProfileCard } from "../common/ProfileCard/ProfileCard";
import { ChatWindow } from "./ChatWindow/ChatWinow";
import { useChatSocket } from "./useChatSocket";
import { ChatScene } from "../canvas/ChatScene";
import "./ChatRoomPage.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../common/Navbar/Navbar";

export const ChatRoomPage = () => {
  const { chatList, actionInfo, chatSocket } = useChatSocket();
  const navigate = useNavigate();
  const exitRoom = () => {
    navigate(-1);
  };
  return (
    <>
      <ChatScene actionInfo={actionInfo} chatSocket={chatSocket} />
      <Navbar />
      <div className="side">
        <ChatWindow chatList={chatList} />
        <button className="exitButton" onClick={exitRoom}>
          나가기
        </button>
      </div>
    </>
  );
};
