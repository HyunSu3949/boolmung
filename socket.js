const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://127.0.0.1:5500', //프론트 개발 도메인
      methods: ['GET', 'POST'],
    },
  });

  app.set('io', io);
  const room = io.of('/room');
  const chat = io.of('/chat');

  room.on('connection', (socket) => {
    console.log('room 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('room 네임스페이스 접속 해제');
    });
  });

  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');

    socket.on('join', (data) => {
      console.log('join 이벤트 발생');
      socket.join(data);
    });

    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
    });
  });
};
