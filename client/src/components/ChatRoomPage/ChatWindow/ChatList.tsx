import React, { useCallback, useEffect, useState } from "react";

type Chat = {
  room: string;
  user: string;
  message: string;
};
export const ChatList = ({ chatList }: { chatList: Chat[] }) => {
  return (
    <div>
      <ul>
        {chatList.map((chat, idx) => (
          <li key={idx}>{chat.message}</li>
        ))}
      </ul>
    </div>
  );
};
