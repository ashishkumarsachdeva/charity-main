const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
//app
const app = express();

// import all router
const userRouter = require('./routes/user.js')
const roomRouter = require('./routes/room.js')
const bookingRouter = require('./routes/booking.js')
const rattingRouter = require('./routes/ratting.js')
const conversationRouter = require('./routes/conversation.js')
const messageRouter = require('./routes/message.js')
const donationRouter = require('./routes/donation.js')


//connect to db
require("./helpers/db/dbConnection")();

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routing
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/ratting', rattingRouter);
app.use('/api/conversation', conversationRouter);
app.use('/api/message', messageRouter);
app.use('/api/donation', donationRouter);


//run
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is Running on Port: " + port);
})