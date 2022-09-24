const express = require('express');
const router = express.Router();

//get controllers
const userController = require('../controllers/user');

//create new user
router.route('/register')
    .post(userController.register)

//user login
router.route('/login')
    .post(userController.login)

//get user profile
router.route('/:userId')
    .get(userController.requireSignin, userController.getUserProfile)

//get user photo
router.route("/photo/:userId")
    .get(userController.getPhoto)

//user profile update
router.route('/update/:userId')
    .put(userController.requireSignin, userController.isAuth, userController.putUpdateUser)

//user profile pic update
router.route('/update/photo/:userId')
    .put(userController.requireSignin, userController.isAuth, userController.updateUserImage)

//sign out routing
router.route('/signout')
    .get(userController.signout)



//url parameter
//get user by id
router.param("userId", userController.userByID);



module.exports = router; 