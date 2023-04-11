import React, { useState } from "react";
import { useRoomList } from "./useRoomList";
import { CreateChatModal } from "./CreateChatModal/CreateChatModal";

export const RoomList: React.FC = () => {
  const { roomList, enterRoom } = useRoomList();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <ul>
        {roomList.map((room: any) => (
          <li key={room.id} onClick={() => enterRoom(room.id)}>
            <h2>{room.title}</h2>
            <p>
              참가자 : {room.participants.length}/{room.max}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={openModal}>채팅방 개설</button>
      <CreateChatModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
