const express = require('express');
const router = express.Router();

//get controllers
const roomController = require('../controllers/room');
const userController = require('../controllers/user')

//create new room
router.route('/create/:userId')
    .post(
        userController.requireSignin,
        userController.isAuth,
        roomController.createRoom)

//get all rooms of a category
router.route('/:category').get(roomController.getRoomByCategories)


//get single room
router.route('/details/:roomId')
    .get(
        roomController.singleRoom)

//get room photo
router.route("/photo/:roomId")
    .get(roomController.getPhoto)



//url parameter
//get user by id
router.param("userId", userController.userByID);

module.exports = router; 