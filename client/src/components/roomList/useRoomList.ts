import { useEffect, useState } from "react";
import { getAllRoom } from "../../apis/room/getAllRoom";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "./../../socket/socket";

export const useRoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const { isLogedIn } = useAuth();
  const navigate = useNavigate();

  const enterRoom = (id: string) => {
    navigate(`/room/${id}`);
    joinRoom(id);
  };

  useEffect(() => {
    if (isLogedIn) {
      (async () => {
        const result = await getAllRoom();
        console.log(result.data.data.data);

        setRoomList(
          result.data.data.data.map((roomInfo: any) => ({
            id: roomInfo._id,
            title: roomInfo.title,
          }))
        );
      })();
    } else {
      setRoomList([]);
    }
  }, [isLogedIn]);

  return { roomList, enterRoom };
};
