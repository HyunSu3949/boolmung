import React from "react";
import { useRoomList } from "./useRoomList";

export const RoomList: React.FC = () => {
  const { roomList, enterRoom } = useRoomList();

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
    </div>
  );
};
