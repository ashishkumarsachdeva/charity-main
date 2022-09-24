const Booking = require('../models/Booking')
const Room = require('../models/Room')


//create new room book
exports.postBookRoom = (req, res, next) => {

    const booking = new Booking({ ...req.body, bookingUserID: req.profile._id });
    booking.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Can't Create an Booking"
            })
        }
        return res.json({
            result,
        });
    });
}


//get booking history
exports.history = async (req, res, next) => {
    let bookingHistory = await Booking.find({ bookingUserID: req.profile._id }).sort('-created').populate("roomID", "location type ratting noOfRatting");
    return res.json({ bookingHistory })
}

//get owner booking history 
exports.ownerHistory = async (req, res, next) => {
    const roomIDs = await Room.find({ owner: req.profile._id }).select('_id')
    const bookingHistory = await Booking.find({ roomID: { $in: [...roomIDs] } }).sort('-created').populate("roomID", "location type ratting noOfRatting");
    return res.json({ bookingHistory })
}