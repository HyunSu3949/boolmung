const express = require('express');
const roomController = require('./../controllers/roomController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(roomController.getAllRoom)
  .post(roomController.createRoom);

router
  .route('/:id')
  .get(roomController.enterRoom)
  .delete(roomController.removeRoom);

router.route('/:id/chat').post(roomController.sendChat);

module.exports = router;
