import axiosInstance from "../utils/instance";

export const joinRoom = async (roomId: string) => {
  await axiosInstance.get(`/rooms/${roomId}`);
};
