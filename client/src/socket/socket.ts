// import { io, Socket } from "socket.io-client";
// import axiosInstance from "../apis/utils/instance";

// export const chatSocket: Socket = io("http://127.0.0.1:3000/chat", {
//   path: "/socket.io",
// });

// chatSocket.on("join", (data) => {
//   console.log(data);
// });
// chatSocket.on("chat", (data) => {
//   console.log(data);
// });

// export const joinRoom = async (roomId: string, userId: string) => {
//   await axiosInstance.get(`/rooms/${roomId}`);
//   chatSocket.emit("join", { roomId, userId });
// };

// export const sendChat = async (roomId: string, text: string) => {
//   await axiosInstance.post(`/rooms/${roomId}/chat`, {
//     chat: text,
//   });
// };
