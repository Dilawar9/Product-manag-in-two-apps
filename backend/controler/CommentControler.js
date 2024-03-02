
const CommentModel = require("../module/CommentModel")

// create comments
const create = async (req, res) => {
    const { postid, comment } = req.body;
    try {

        // check post id and user id 
        const alreadyUser = await CommentModel.findOne({ postid: postid });
        if (alreadyUser !== null) {
            return res.json({
                status: "failed",
                message: "Already comment"
            })
        }

        // create new comment
        await CommentModel.create({
            postid: postid,
            comment: comment

        });
        // comment responst

        return res.status(200).json({
            status: "success",
            message: "comment created ",
        })

    } catch (error) {
        return res.status(409).json({
            status: "failed",
            message: "Something went wrong"
        })
    }
}

// get all comment

const getall = async (req, res) => {

    try {
        const comment = await CommentModel.find({});
        return res.json({
            status: true,
            comment: comment
        })

    } catch (error) {
        res.json({
            status: false,
            message: "error.message"
        })

    }
};

// delete comment

const delet = async (req, res) => {
    const id = req.params.id;
    try {
        await CommentModel.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "Comment succesfully deleted"
        })
    } catch (error) {
        return res.status(404).json({
            status: false,
            message: "something went wrong"
        })
    }
};

// update comment

const update= async (req, res) => {
    const id = req.params.id;
    try {
        const updatedcomment = await CommentModel.findByIdAndUpdate(id, req.body, {
            runValidators: true,
            new: true
        });
        return res.status(200).json({
            status: true,
            updatedcomment: updatedcomment,
            message: "Comment succesfully updated"
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
    delet,
    update,
    

}



