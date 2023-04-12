import React from "react";
import { ProfileCard } from "../profileCard/ProfileCard";
import { ChatWindow } from "../room/Room";
import ChatScene from "./../canvas/ChatScene";

export const ChatRoomPage = () => {
  return (
    <>
      <ChatScene />
      <div className="side">
        <ProfileCard />
        <ChatWindow />
      </div>
    </>
  );
};
