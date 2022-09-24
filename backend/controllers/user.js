//import packages and models
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const formidable = require("formidable");
const fs = require("fs");

//register new user
exports.register = (req, res, next) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image Upload Error",
            });
        }
        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(fields.password, salt);
        const user = new User({ ...fields, password: hash });
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: "Image Should be less than 10MB",
                });
            }
            user.id_photo.data = fs.readFileSync(files.photo.filepath);
            user.id_photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
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

//user login
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email is Not Registred!! Please Signup First",
            });
        }

        //if user is not authenticated
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password dont Match",
            });
        }

        //create jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 9999 });

        const { _id, firstname, lastname, email, userType } = user;

        return res.json({
            token,
            user: {
                _id,
                email,
                firstname,
                lastname,
                userType
            },
        });
    });
}


//find user by id
exports.userByID = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not Found",
            });
        }
        req.profile = user;
        next();
    });
};


//get user image
exports.getPhoto = async (req, res, next) => {
    if (req.profile.id_photo.data) {
        res.set("Content-Type", req.profile.id_photo.contentType);
        return res.send(req.profile.id_photo.data);
    }
};

//require sign in
exports.requireSignin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})


//check if the user is authentic
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth.id;

    //console.log(req.profile._id, req.auth);
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}


//get user profile
exports.getUserProfile = (req, res, next) => {
    return res.json(req.profile)
}


//update user
exports.putUpdateUser = (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        {
            $set: req.body,
        },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not applicable to perform this action",
                });
            }
            user.password = undefined;
            return res.json(user);
        }
    );
};

//update user image
exports.updateUserImage = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image Upload Error",
            });
        }
        let id_photo = {
            data: "",
            contentType: ""
        };
        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: "Image Should be less than 10MB",
                });
            }
            id_photo.data = fs.readFileSync(files.photo.filepath);
            id_photo.contentType = files.photo.type;
 
        }


        User.findOneAndUpdate(
            
            { _id: req.profile._id },
            { id_photo },
            { new: true },
            (err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "You are not applicable to perform this action",
                    });
                }
                user.password = undefined;
                return res.json({ msg: "Profile Pic Updated!" });
            }
        );
    });
}


//user signout
exports.signout = (req, res, next) => {
    res.clearCookie('t');
    res.json({ message: "Signout Successfully" });
}
