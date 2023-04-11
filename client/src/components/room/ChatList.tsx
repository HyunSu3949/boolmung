import React, { useCallback, useEffect, useState } from "react";

type Chat = {
  name: string;
  message: string;
};
export const ChatList = ({ chats }: { chats: Chat[] }) => {
  return (
    <div>
      <ul>
        {chats.map((chat, idx) => (
          <li key={idx}>{chat.message}</li>
        ))}
      </ul>
    </div>
  );
};
