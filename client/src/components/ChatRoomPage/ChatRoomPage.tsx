import React, { useEffect } from "react";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import { ChatWindow } from "./ChatWindow/ChatWinow";
import { useChatSocket } from "./useChatSocket";
import { ChatScene } from "../canvas/ChatScene";

export const ChatRoomPage = () => {
  const { chatList, actionInfo, chatSocket } = useChatSocket();

  return (
    <>
      <ChatScene actionInfo={actionInfo} chatSocket={chatSocket} />
      <div className="side">
        <ProfileCard />
        <ChatWindow chatList={chatList} />
      </div>
    </>
  );
};
