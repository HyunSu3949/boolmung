const express = require('express');
const roomController = require('./../controllers/roomController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/', roomController.getAllRoom).post('/', roomController.createRoom);

module.exports = router;
