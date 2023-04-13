import React, { useEffect } from "react";
import { ProfileCard } from "../profileCard/ProfileCard";
import { ChatWindow } from "../room/ChatWinow";
import { useChatSocket } from "../room/useChatSocket";
import ChatScene from "./../canvas/ChatScene";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

export const ChatRoomPage = () => {
  const { chatList, usersInfo } = useChatSocket();
  return (
    <>
      <ChatScene />
      <div className="side">
        <ProfileCard />
        <ChatWindow chatList={chatList} />
      </div>
    </>
  );
};
