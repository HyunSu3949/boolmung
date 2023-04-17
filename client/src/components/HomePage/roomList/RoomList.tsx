import React, { useState } from "react";
import { useRoomList } from "./useRoomList";
import { CreateChatModal } from "../../ChatRoomPage/CreateChatModal/CreateChatModal";
import { useRoomSocket } from "./useRoomSocket";
import "./RoomList.css";

export const RoomList: React.FC = () => {
  const { roomList, enterRoom } = useRoomList();
  useRoomSocket();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="roomListBox">
        <ul className="roomUl">
          {roomList.map((room: any) => (
            <li
              className="roomLi"
              key={room.id}
              onClick={() => enterRoom(room.id)}
            >
              <h2 className="roomTitle">{room.title}</h2>
              <p className="roomInfo">
                {room.participants.length}/{room.max}
              </p>
            </li>
          ))}
        </ul>
        <button className="makeRoomButton" onClick={openModal}>
          채팅방 개설
        </button>
        <CreateChatModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  );
};
