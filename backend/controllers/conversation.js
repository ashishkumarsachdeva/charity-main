const Conversation = require('../models/Conversation');

//create new  conversation
exports.create = async (req, res, next) => {
    let userId = req.profile._id

    const allConv = await Conversation.find();

    for (let i = 0; i < allConv.length; i++) {
        if (allConv[i].members.includes(req.profile._id) && allConv[i].members.includes(req.body.receiverId)) {
            return res.json("Conversation Already Exist!")
        }
    }

    const conversation = new Conversation({
        members: [userId, req.body.receiverId]
    })

    conversation.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Can't Create  Conversation"
            })
        } else {
            return res.status(200).json({
                result
            })
        }
    })
}

//get conversation by user id
exports.getConversation = async (req, res, next) => {
    const conversation = await Conversation.find({
        members: {
            $in: [req.profile._id]
        }
    })

    return res.status(200).json({
        conversation
    })
}