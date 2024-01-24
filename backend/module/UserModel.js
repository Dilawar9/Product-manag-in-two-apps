var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String
    },

    password: String,

    isAdmin: {
        type: Boolean,
        default: false
    },

    image: {
        type: String
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel