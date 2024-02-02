
const fs = require("fs");
const CategoryModel = require("../module/CategoryModel");




const creat = async (req, res) => {

    try {

        const newCategory = await CategoryModel.create(req.body);
        res.status(200).json({
            status: true,
            newCategory: newCategory,
            message: "category  are create "
        })
    } catch (error) {
        if (error.name === 'ValidationError') {

            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(201).json({
                status: false,
                errors: errors
            });
        } else {

            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


const getall = async (req, res) => {

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

// const mobileCategory = async (req, res) => {

//     console.log("sdfsdf")
//     try {
//         const data = await CategoryModel.find({})
//         console.log(data)

//         return res.status(200).json({
//             status: true,
//             data: data
//         })
//     } catch (error) {

//     }
// }

// const softwareCategory = async (req, res) => {

//     console.log("sdfsdf");
//     try {
//         const data = await createpost.find({ category: 'Softweare' })
//         console.log(data);

//         return res.status(201).json({
//             status: true,
//             data: data
//         })
//     } catch (error) {

//     }
// }


module.exports = {
    creat,
    getall,
    // mobileCategory,
    // softwareCategory
}


