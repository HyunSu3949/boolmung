import { useEffect, useState } from "react";
import { getAllRoom } from "../../../apis/room/getAllRoom";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../../apis/room/joinRoom";

export const useRoomList = () => {
  const [roomList, setRoomList] = useState([]);

  const navigate = useNavigate();

  const enterRoom = (roomId: string) => {
    joinRoom(roomId);
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    (async () => {
      const result = await getAllRoom();

      setRoomList(
        result.data.data.data.map((roomInfo: any) => ({
          id: roomInfo._id,
          owner: roomInfo.owner,
          title: roomInfo.title,
          max: roomInfo.max,
          participants: roomInfo.participants,
        }))
      );
    })();
  }, []);

  return { roomList, enterRoom };
};
