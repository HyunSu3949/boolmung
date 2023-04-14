const express = require("express");
const roomController = require("./../controllers/roomController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(roomController.getAllRoom)
  .post(roomController.createRoom);

router
  .route("/:id")
  .get(roomController.enterRoom)
  .delete(roomController.removeRoom);

router
  .route("/:id/chat")
  .get(roomController.getChat)
  .post(roomController.sendChat)
  .delete(roomController.exitRoom);

router.route("/:id/move").post(roomController.sendAction);

module.exports = router;
