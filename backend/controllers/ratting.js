const Ratting = require('../models/Ratting');
const Room = require('../models/Room')

//add new ratting
exports.addRatting = async (req, res, next) => {
    const roomID = req.body.roomID;
    console.log(req.body);
    Room.findById(roomID).select("-photo").then(room => {
        if (!room) {
            return res.status(400).json({
                error: "Can't find Room Info",
            });
        }

        //get current room ratting
        let currentRatting = room.ratting ? room.ratting : 0;
        let totalNoOfRatting = room.noOfRatting ? room.noOfRatting : 0;

        //calculate new ratting
        let ratting = 0;
        if (totalNoOfRatting === 0) {
            ratting = req.body.ratting;
            totalNoOfRatting = 1;
        } else {
            totalNoOfRatting = totalNoOfRatting + 1
            ratting = (currentRatting + req.body.ratting) / (totalNoOfRatting)
        }


        //update room ratting
        Room.findOneAndUpdate(
            { _id: roomID },
            {
                $set: {
                    ratting: ratting,
                    noOfRatting: totalNoOfRatting,
                },
            },
            { new: true },
            (err, r) => {
                if (err) {
                    return res.status(400).json({
                        error: "Can't Update Room Ratting",
                    });
                }
                //update ratting schema
                const ratting = new Ratting({ ratting: req.body.ratting, text: req.body.text, roomID: roomID, author: req.profile._id });
                ratting.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: "Can't Create Ratting"
                        })
                    }
                    return res.json({
                        result
                    });
                });

            }
        );



    })
}