import React from "react";
import { ProfileCard } from "../profileCard/ProfileCard";
import { ChatWindow } from "../room/ChatWinow";
import { useParams } from "react-router-dom";
import { useChatSocket } from "../room/useChatSocket";
import ChatScene from "./../canvas/ChatScene";

export const ChatRoomPage = () => {
  const { id: roomId = "" } = useParams();
  const { emitChat, chatList } = useChatSocket(roomId);

  return (
    <>
      <ChatScene />
      <div className="side">
        <ProfileCard />
        <ChatWindow emitChat={emitChat} chatList={chatList} />
      </div>
    </>
  );
};
