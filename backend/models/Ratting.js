const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const rattingSchema = new mongoose.Schema(
    {
        ratting: {
            type: Number,
            require: true,
            default: 0
        },
        text: {
            type: String,
            require: true
        },
        roomID: {
            type: ObjectId,
            ref: "Room",
            required: true,
        },
        author: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);




module.exports = mongoose.model('Ratting', rattingSchema);