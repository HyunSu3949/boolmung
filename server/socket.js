const SocketIO = require("socket.io");
const Room = require("./models/roomModel");

const socketUserMap = {};

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*", //프론트 개발 도메인
      methods: ["GET", "POST"],
    },
  });

  app.set("io", io);
  const room = io.of("/room");
  const chat = io.of("/chat");

  room.on("connection", (socket) => {
    console.log("room 네임스페이스에 접속");
    socket.on("disconnect", () => {
      console.log("room 네임스페이스 접속 해제");
    });
  });

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스에 접속");

    socket.on("join", (data) => {
      console.log("join 이벤트 발생");
      console.log(data);
      socket.join(data.roomId);

      socketUserMap[socket.id] = {
        userId: data.userId,
        roomId: data.roomId,
      };
    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");
      console.log(socketUserMap);

      if (!socketUserMap[socket.id]) return;

      const { userId, roomId } = socketUserMap[socket.id];

      delete socketUserMap[socket.id];

      const room = await Room.findByIdAndUpdate(
        roomId,
        {
          $pull: {
            participants: { user: userId },
          },
        },
        { new: true }
      );

      if (room.participants === 0) {
        await Room.findByIdAndDelete(roomId);
        socket
          .to(roomId)
          .emit("roomDeleted", { message: "채팅방이 삭제되었습니다." });
      } else {
        socket.to(roomId).emit("exit", {
          user: "system",
          chat: `${userId}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};
