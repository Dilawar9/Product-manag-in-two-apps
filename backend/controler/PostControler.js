const fs = require("fs");
const PostModel = require("../module/PostModel");


// post create

const create = async (req, res) => {
  

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
        const newPost = await PostModel.create(req.body);
        console.log(newPost);
        res.status(201).json({
            status: true,
            newPost: newPost,
            message: "post created"
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

// getall post
const getall = async (req, res) => {

    try {
        const post = await PostModel.find({});
        return res.json({
            status: true,
            post: post
        })

    } catch (error) {
        res.json({
            status: false,
            message: "error.message"
        })

    }
}
const getsingle = async (req, res) => {
const id=req.params.id
    try {
        const post = await PostModel.findById(id);
        return res.json({
            status: true,
            post: post
        })

    } catch (error) {
        res.json({
            status: false,
            message: "error.message"
        })

    }
}
// delete post by id

const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        await PostModel.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "Post succesfully deleted"
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "something went wrong"
        })
    }
};


// update post by id
const update = async (req, res) => {
    const id = req.params.id;
    try {

        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
            const fileNmae = req.file.filename + "." + extension;

            const oldimg = await PostModel.findById(id);
            fs.unlink(`uploads/${oldimg.image}`, () => console.log("file deleted"))
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
        const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        });
        return res.status(200).json({
            status: true,
            updatedPost: updatedPost,
            message: "post succesfully updated"
        })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(422).json({ errors });
        } else {
            // Other types of errors
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
module.exports = {
    create,
    getall,
    deletePost,
    update,
    getsingle

}