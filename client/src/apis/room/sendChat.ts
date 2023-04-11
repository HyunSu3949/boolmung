import axiosInstance from "../utils/instance";

export const sendChat = async (roomId: string, message: string) => {
  await axiosInstance.post(`/rooms/${roomId}/chat`, {
    message,
  });
};
