const express = require('express');
const router = express.Router();

//get controllers
const rattingController = require('../controllers/ratting');
const userController = require('../controllers/user')

//create new room
router.route('/add/:userId')
    .post(
        userController.requireSignin,
        userController.isAuth,
        rattingController.addRatting)




//url parameter
//get user by id
router.param("userId", userController.userByID);

module.exports = router; 