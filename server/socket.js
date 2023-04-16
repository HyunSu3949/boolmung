const SocketIO = require("socket.io");
const Room = require("./models/roomModel");

const socketUserMap = {};
const actionState = {};

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
      const { roomId, userId } = data;
      socket.join(data.roomId);

      socketUserMap[socket.id] = {
        userId,
        roomId,
      };

      actionState[socket.id] = {
        userId,
        input: {
          forward: false,
          backward: false,
          left: false,
          right: false,
        },
        position: [0, 0, 0],
        cameraCharacterAngleY: 0,
      };

      chat.to(roomId).emit("chat", {
        type: "system",
        message: `${userId} 님이 입장하셨습니다.`,
      });
      chat.to(roomId).emit("move", actionState);
    });

    socket.on("move", (data) => {
      const { roomId, userId, input, position, cameraCharacterAngleY } = data;
      actionState[socket.id] = {
        userId,
        input,
        position,
        cameraCharacterAngleY,
      };
      chat.to(roomId).emit("move", actionState);
    });

    socket.on("disconnect", async () => {
      console.log("chat 네임스페이스 접속 해제");

      if (!socketUserMap[socket.id]) return;

      const { userId, roomId } = socketUserMap[socket.id];

      delete socketUserMap[socket.id];
      delete actionState[socket.id];

      chat.to(roomId).emit("move", actionState);

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
        chat
          .to(roomId)
          .emit("roomDeleted", { message: "채팅방이 삭제되었습니다." });
      } else {
        chat.to(roomId).emit("chat", {
          type: "system",
          message: `${userId}님이 퇴장하셨습니다.`,
        });
      }
    });
  });
};
