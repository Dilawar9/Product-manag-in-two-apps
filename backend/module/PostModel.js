var mongoose = require("mongoose");

var newshema = new mongoose.Schema({
    // autherId:
    title: String,
    body: String,
    category:{
        type: String,
        enum: ["mobile", "computer"],
    } ,
    image: String,
    status: {
        type: String,
        enum: ["publish", "draft"],

    }

}, { timestamps: true })


const PostModel = mongoose.model('post', newshema);
module.exports = PostModel;