const express = require('express');
const router = express.Router();

//get controllers
const messageController = require('../controllers/message');
const userController = require('../controllers/user')

//add new message
router.route('/add/:userId')
    .post(
        userController.requireSignin,
        userController.isAuth,
        messageController.addMessage)

//get all message by conversationId
router.route('/:conversationId')
    .get(
        userController.requireSignin,
        messageController.getAllMessage)

//url parameter
//get user by id
router.param("userId", userController.userByID);

module.exports = router; 