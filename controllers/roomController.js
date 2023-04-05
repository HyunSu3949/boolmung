const Room = require('../schemas/room');
const catchAsync = require('../utils/catchAsync');

exports.createRoom = catchAsync(async (req, res, next) => {
  const newRoom = await Room.create({
    title: req.body.title,
    max: req.body.max,
    owner: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: newRoom,
    },
  });
});
