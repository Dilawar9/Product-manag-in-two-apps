var mongoose = require("mongoose");

var categoryschema = new mongoose.Schema({
    title: String,
    image: String,
}, { timestamps: true });

const CategoryModel = mongoose.model('category', categoryschema);
module.exports = CategoryModel;
