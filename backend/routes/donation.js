const express = require('express');
const router = express.Router();

//get controllers
const donationController = require('../controllers/donation');


//create new room
router.route('/add')
    .post(
        donationController.dontation)




module.exports = router; 