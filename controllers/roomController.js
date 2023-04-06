const Room = require('../schemas/room');
const Chat = require('../schemas/chat');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createRoom = catchAsync(async (req, res, next) => {
  const newRoom = await Room.create({
    title: req.body.title,
    max: req.body.max,
    owner: req.user.id,
  });

  const io = req.app.get('io');
  io.of('/room').emit('newRoom', newRoom);

  res.status(201).json({
    status: 'success',
    data: {
      data: newRoom,
    },
  });
});

exports.getAllRoom = catchAsync(async (req, res, next) => {
  const Rooms = await Room.find();

  res.status(200).json({
    status: 'sucees',
    length: Rooms.length,
    data: {
      data: Rooms,
    },
  });
});

exports.enterRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return next(new AppError('채팅방이 존재하지 않습니다.', 404));
  }

  if (room.password && room.password !== req.query.password) {
    return next(new AppError('비밀번호가 일지하지 않습니다.', 404));
  }

  const io = req.app.get('io');
  const { rooms } = io.of('/chat').adapter;

  if (room.max <= rooms.get(req.params.id)?.size) {
    return next(new AppError('허용 인원을 초과하였습니다.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      room,
    },
  });
});

exports.removeRoom = catchAsync(async (req, req, next) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  const chat = await Chat.deleteMany({ room: req.params.id });

  if (!room) {
    return next(new AppError('채팅방이 존재하지 않습니다.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
