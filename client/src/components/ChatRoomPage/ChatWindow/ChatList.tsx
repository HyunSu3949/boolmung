import React, { useEffect, useRef } from "react";

type Chat = {
  room: string;
  user: string;
  message: string;
};
export const ChatList = ({ chatList }: { chatList: Chat[] }) => {
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    chatListRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatList]);

  return (
    <div>
      <ul ref={chatListRef}>
        {chatList.map((chat, idx) => (
          <li key={idx}>{chat.message}</li>
        ))}
      </ul>
    </div>
  );
};
