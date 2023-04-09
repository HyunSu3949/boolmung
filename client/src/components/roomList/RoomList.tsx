import React from "react";
import { useRoomList } from "./useRoomList";

export const RoomList: React.FC = () => {
  const { roomList, enterRoom } = useRoomList();

  return (
    <div>
      <ul>
        {roomList.map((room: any) => (
          <li key={room.id} onClick={() => enterRoom(room.id)}>
            {room.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
