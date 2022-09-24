const Room = require('../models/Room')
const Ratting = require('../models/Ratting');
const formidable = require("formidable");
const fs = require("fs");

//create a room
exports.createRoom = (req, res, next) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image Upload Error",
            });
        }

        let service =fields.service.split(',');

        let room = new Room({...fields,service});


        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: "Image Should be less than 10MB",
                });
            }
            room.photo.data = fs.readFileSync(files.photo.filepath);
            room.photo.contentType = files.photo.type;
        }

        room.owner = req.profile._id
        room.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            return res.json({
                result,
            });
        });
    });
}


//get room by category type
exports.getRoomByCategories = (req, res, next) => {

    Room.find({ type: req.params.category })
        .select('-photo')
        .populate("owner", "firstname lastname")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                });
            } else {
                return res.json({
                    result,
                });
            }
        })
}

//get single room details info
exports.singleRoom = async (req, res, next) => {

    //get single  room info
    let roomInfo = await Room.findById(req.params.roomId)
        .select("-photo ")
        .populate("owner", "firstname lastname email")
        .catch(err => {
            return res.status(400).json({
                error: errorHandler(err),
            });
        })

    //get all reviews
    let reviews = await Ratting.find({ roomID: req.params.roomId }).populate("author", "firstname lastname")
        .then(result => {
            return result;
        }).catch(err => {
            return res.status(400).json({
                error: errorHandler(err),
            });
        })

    return res.json({ roomInfo, reviews })

}

//get room image by id
exports.getPhoto = async (req, res, next) => {

    let roomInfo = await Room.findById(req.params.roomId)
        .select("photo")
        .catch(err => {
            return res.status(400).json({
                error: errorHandler(err),
            });
        })

    if (roomInfo.photo.data) {
        res.set("Content-Type", roomInfo.photo.contentType);
        return res.send(roomInfo.photo.data);

    }
};