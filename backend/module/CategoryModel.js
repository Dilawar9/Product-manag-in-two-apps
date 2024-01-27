var mongoose = require("mongoose");

var categoryschema = new mongoose.Schema({
    category: String,
}, { timestamps: true });

const CategoryModel = mongoose.model('category', categoryschema);
module.exports = CategoryModel;
