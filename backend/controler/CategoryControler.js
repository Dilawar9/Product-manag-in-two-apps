
const fs = require("fs");
const CategoryModel=require("../module/CategoryModel");




const creat = async (req, res) => {

   
    
    try {
        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
            const fileNmae = req.file.filename + "." + extension;

            // new key in body object
            req.body.image = fileNmae;

            fs.rename(req.file.path, `uploads/${fileNmae}`, () => {
                console.log("\nFile Renamed!\n");
            });
        } else {
            fs.unlink(req.file.path, () => console.log("file deleted"))
            return res.json({
                message: "only images are accepted"
            })
        }
        const newCategory = await CategoryModel.create(req.body);
        res.status(201).json({
            status: true,
            newCategory: newCategory,
            message: "category  are create "
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(200).json({
                status: false,
                errors: errors
            });
        } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


const getall=async (req, res) => {

    try {
        const category = await CategoryModel.find({});
        return res.json({
            status: true,
            category: category
        })

    } catch (error) {
        res.json({
            status: false,
            message: "error.message"
        })

    }
}

module.exports={
    creat,
    getall
}