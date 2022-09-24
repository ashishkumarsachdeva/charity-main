const express = require('express');
const router = express.Router();

//get controllers
const bookingController = require('../controllers/booking');
const userController = require('../controllers/user')

//create new room
router.route('/create/:userId')
    .post(
        userController.requireSignin,
        userController.isAuth,
        bookingController.postBookRoom)

//booking history
router.route('/history/:userId')
    .get(
        // userController.requireSignin,
        // userController.isAuth,
        bookingController.history)

//booking owner  history
router.route('/owner/history/:userId')
    .get(
        userController.requireSignin,
        userController.isAuth,
        bookingController.ownerHistory)





//url parameter
//get user by id
router.param("userId", userController.userByID);

module.exports = router; 