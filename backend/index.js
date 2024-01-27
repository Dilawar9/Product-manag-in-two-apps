const express = require('express')
const app = express();
const mongoose = require("mongoose");

// const fs = require('fs');
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
const cors = require('cors')
const path = require("path");
// authentucation

// const UserModel = require("./module/UserModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const secretKey = "23sf&%T23423sdfasfdaxcvaxfgsadfsdf#O#d;((23234))";

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));

// import routes

const UserRoute = require("./route/UserRoute");
const PostRoute=require("./route/PostRoute");
const CategoryRoute=require("./route/CategoryRoute");
const CommentRoute=require("./route/CommentRoute");
app.use("/User", UserRoute);
app.use("/Post",PostRoute);
app.use("/Comment",CommentRoute);
app.use("/category",CategoryRoute);






// // user registration
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {

//         // confirm the user is registered or not with email
//         const userExist = await UserModel.findOne({ email: email });
//         if (userExist === null) {
//             return res.json({
//                 status: "failed",
//                 message: "Authentication failed"
//             })
//         }

//         // confirm password
//         const confirmPass = await bcrypt.compare(password, userExist.password);
//         if (confirmPass === false) {
//             return res.json({
//                 status: "failed",
//                 message: "Authentication failed"
//             })
//         }

//         // generate token
//         const token = jwt.sign({ id: userExist._id }, secretKey);

//         // return response
//         res.status(201).json({
//             status: "success",
//             message: "Logged in successfully",
//             token: token
//         })

//     } catch (error) {

//     }
// })

// //////
// // Get ALL create post Data API

// app.get("/getdata", async (req, res) => {
//     try {

//         const Data = await create.find({});
//         return res.status(200).json({
//             status: true,
//             Data: Data
//         })

//     } catch (error) {
//         return res.status(404).json({
//             status: false,
//             message: "Data not Find"
//         })
//     }
// })

// //get createpost By Id API

// app.get("/getdata/:id", async (req, res) => {

//     const id = req.params.id;

//     try {

//         const Data = await create.findById(id);
//         return res.status(200).json({
//             status: true,
//             Data: Data
//         })

//     } catch (error) {
//         return res.status(200).json({
//             status: false,
//             message: "Dataa not Find"
//         })
//     }
// })



// //create post API
// app.post("/create", upload.single('image'), async (req, res) => {

//     try {
//         const extension = req.file.mimetype.split("/")[1];
//         if (extension == "png" || extension == "jpg" || extension == "jpeg") {
//             const fileName = req.file.filename + "." + extension;
//             req.body.image = fileName
//             console.log(fileName)

//             fs.rename(req.file.path, `uploads/${fileName}`, () => {
//                 console.log("\nFile Renamed!\n");
//             })
//         }
//         else {

//             fs.unlink(req.file.path, () => console.log("file deleted"))
//             return res.json({
//                 message: "only images are accepted"
//             })
//         }

//         await create.create(req.body);
//         return res.status(201).json({
//             // newdata: newdata,
//             message: "post created sucessfully"
//         })
//     } catch (error) {

//         if (error.name === 'ValidationError') {
//             // Mongoose validation error
//             const errors = {};
//             for (const field in error.errors) {
//                 errors[field] = error.errors[field].message;
//             }
//             res.status(200).json({ errors });
//         } else {
//             // Other types of errors
//             res.status(500).json({ error: 'Internal Server Error' });
//         }

//     }
// })


// //////////


// // Get ALL comment Data API

// app.get("/getcomment", async (req, res) => {
//     try {

//         const Data = await comment.find({});
//         return res.status(200).json({
//             status: true,
//             Data: Data
//         })

//     } catch (error) {
//         return res.status(404).json({
//             status: false,
//             message: "Data not Find"
//         })
//     }
// })


// // Comment create Api
// app.post("/comment", async (req, res) => {

//     try {
//         await comment.create(req.body);
//         return res.status(201).json({
//             // newdata: newdata,
//             message: "Comment created sucessfully"
//         })
//     } catch (error) {

//         if (error.name === 'ValidationError') {
//             // Mongoose validation error
//             const errors = {};
//             for (const field in error.errors) {
//                 errors[field] = error.errors[field].message;
//             }
//             res.status(200).json({ errors });
//         } else {
//             // Other types of errors
//             res.status(500).json({ error: 'Internal Server Error' });
//         }

//     }
// })



// //////
// //Category Table Api

// app.post("/category", upload.single('image'), async (req, res) => {

//     try {
//         const extension = req.file.mimetype.split("/")[1];
//         if (extension == "png" || extension == "jpg" || extension == "jpeg") {
//             const fileName = req.file.filename + "." + extension;
//             req.body.image = fileName
//             console.log(fileName)

//             fs.rename(req.file.path, `uploads/${fileName}`, () => {
//                 console.log("\nFile Renamed!\n");
//             })
//         }
//         else {

//             fs.unlink(req.file.path, () => console.log("file deleted"))
//             return res.json({
//                 message: "only images are accepted"
//             })
//         }

//         await Category.create(req.body);
//         return res.status(201).json({
//             // newdata: newdata,
//             message: "post created sucessfully"
//         })
//     } catch (error) {

//         if (error.name === 'ValidationError') {
//             // Mongoose validation error
//             const errors = {};
//             for (const field in error.errors) {
//                 errors[field] = error.errors[field].message;
//             }
//             res.status(200).json({ errors });
//         } else {
//             // Other types of errors
//             res.status(500).json({ error: 'Internal Server Error' });
//         }

//     }
// })



mongoose.connect("mongodb://127.0.0.1:27017/authentication").then(() => {
    app.listen(4001, () => {
        console.log("db conected")

    })
})