const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const roomSchema = new mongoose.Schema(
    {
        location: {
            type: String,
            trim: true,
            required: true,
        },
        type: {
            type: String,
            trim: true,
            required: true,
        },
        roomInfo: {
            type: String,
            trim: true,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        ratting: {
            type: Number,
            default: 0
        },
        noOfRatting: {
            type: Number,
            default: 0
        },
        service: [{
            type: String,
            required: true,
        }],
        owner: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);




module.exports = mongoose.model('Room', roomSchema);