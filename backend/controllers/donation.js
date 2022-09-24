const Donation = require('../models/Donation')

//create donation
exports.dontation = (req, res, next) => {

    const donate = new Donation({ ...req.body });
    donate.save((err, result) => {
        if (err) {

            return res.status(400).json({
                error: "Can't Create an Donate"
            })
        }
        return res.json({
            result,
        });
    });
}