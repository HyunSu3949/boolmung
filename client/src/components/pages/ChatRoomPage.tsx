import React, { useEffect } from "react";
import { ProfileCard } from "../profileCard/ProfileCard";
import { ChatWindow } from "../room/ChatWinow";
import { useChatSocket } from "../room/useChatSocket";
import { ChatScene } from "./../canvas/ChatScene";

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
