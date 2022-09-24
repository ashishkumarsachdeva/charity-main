const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const bookingSchema = new mongoose.Schema(
    {
        bookingDateStart: {
            type: Date,
            require: true
        },
        bookingDateEnd: {
            type: Date,
        },
        adult: {
            type: Number,
            required: true
        },
        child: {
            type: Number,
            required: true
        },
        roomID: {
            type: ObjectId,
            ref: "Room",
            required: true,
        },
        bookingUserID: {
            type: ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);




module.exports = mongoose.model('Booking', bookingSchema);