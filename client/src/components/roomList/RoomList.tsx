import React from "react";
import { useRoomList } from "./useRoomList";

export const RoomList: React.FC = () => {
  const { roomList = [] } = useRoomList();

  return (
    <div>
      <ul>
        {roomList.map((room) => (
          <li>{room}</li>
        ))}
      </ul>
    </div>
  );
};
