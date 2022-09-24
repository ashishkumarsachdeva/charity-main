const mongoose = require("mongoose");

const donateSchema = new mongoose.Schema(
    {
        cardHolderName: {
            type: String,
        },
        cardNo: {
            type: String,
        },
        expDate: {
            type: String,

        },
        cvv: {
            type: String,

        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('Donate', donateSchema);