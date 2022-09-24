const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: true,
            maxlenght: 32,
        },
        lastname: {
            type: String,
            trim: true,
            required: true,
            maxlenght: 32,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        about: {
            type: String,
            trim: true,
        },
        userType: {
            type: String,
            enum: ['doner', 'help'],
            default: 'help'
        },
        id_photo: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
);

//add Methods
userSchema.methods = {
    //check password
    authenticate: function (plainText) {
        return bcrypt.compareSync(plainText, this.password);
    },
};


module.exports = mongoose.model('User', userSchema);