const Room = require('../models/roomModel');
const catchAsync = require('../utils/catchAsync');

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
