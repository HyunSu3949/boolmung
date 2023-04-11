import axiosInstance from "../utils/instance";

export const sendChat = async (roomId: string, text: string) => {
  await axiosInstance.post(`/rooms/${roomId}/chat`, {
    chat: text,
  });
};
