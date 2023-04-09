import { useEffect, useState } from "react";
import { getAllRoom } from "../../apis/room/getAllRoom";
import { useAuth } from "../AuthContext/AuthContext";

export const useRoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const { isLogedIn } = useAuth();

  useEffect(() => {
    if (isLogedIn) {
      (async () => {
        const result = await getAllRoom();
        setRoomList(result.data.data.data.map((room: any) => room.title));
      })();
    } else {
      setRoomList([]);
    }
  }, [isLogedIn]);

  return { roomList };
};
