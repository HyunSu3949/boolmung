import { useEffect, useState } from "react";
import { getAllRoom } from "../../apis/room/getAllRoom";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { joinRoom } from "../../apis/room/joinRoom";
import { useSocket } from "../AuthContext/SocketContext";

export const useRoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const { isLogedIn, currentUser } = useAuth();
  const chatSocket = useSocket();

  const navigate = useNavigate();

  const enterRoom = (roomId: string) => {
    joinRoom(roomId);
    const dataToSend = { roomId, userId: currentUser._id };
    console.log("Data to send:", dataToSend);
    console.log(currentUser);

    chatSocket?.emit("join", { roomId, userId: currentUser._id });
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    if (isLogedIn) {
      (async () => {
        const result = await getAllRoom();
        console.log(result.data.data.data);

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
