import { useEffect, useState } from "react";
import { getAllRoom } from "../../apis/room/getAllRoom";
import { useAuth } from "../AuthContext/AuthContext";

export const useRoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const { isLogedIn } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllRoom();
        setRoomList(result.data.data.data.map((room: any) => room.title));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isLogedIn]);

  return { roomList };
};
