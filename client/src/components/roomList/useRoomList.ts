import { useEffect, useState } from "react";
import { getAllRoom } from "../../apis/room/getAllRoom";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../apis/room/joinRoom";
import { io, Socket } from "socket.io-client";

export const useRoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const { isLogedIn, currentUser } = useAuth();

  const navigate = useNavigate();

  const enterRoom = (roomId: string) => {
    joinRoom(roomId);
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    if (isLogedIn) {
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
    } else {
      setRoomList([]);
    }
  }, [isLogedIn]);

  return { roomList, enterRoom };
};
