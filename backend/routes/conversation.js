const express = require('express');
const router = express.Router();

//get controllers
const conversationController = require('../controllers/conversation');
const userController = require('../controllers/user')

//create new room
router.route('/create/:userId')
    .post(
        userController.requireSignin,
        userController.isAuth,
        conversationController.create)

//get conversation by user id
router.route('/:userId')
    .get(
        userController.requireSignin,
        userController.isAuth,
        conversationController.getConversation)




//url parameter
//get user by id
router.param("userId", userController.userByID);

module.exports = router; 