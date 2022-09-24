const Message = require('../models/Message')

//add new message 
exports.addMessage = (req, res, next) => {
    const msg = new Message({ ...req.body, sender: req.profile._id });

    msg.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Can't Add  New Message"
            })
        } else {
            return res.status(200).json({
                result
            })
        }
    })
}

///get all conversation message
exports.getAllMessage = async (req, res, next) => {
    const allConMsg = await Message.find({
        conversationId: req.params.conversationId
    })

    return res.status(200).json(allConMsg)
}