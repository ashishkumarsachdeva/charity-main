const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//Conversation
const ConversationSchema = new mongoose.Schema(
    {
        members: { type: [ObjectId], }
    },
    { timestamps: true }
);


module.exports = mongoose.model('Conversation', ConversationSchema);