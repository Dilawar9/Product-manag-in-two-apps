const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt   = require("jsonwebtoken");
const secretKey = "23sf&%T23423sdfasfdaxcvaxfgsadfsdf#O#d;((23234))";
const UserModel=require("../module/UserModel");


const login = async (req, res) => {
    try {
        return res.json({
            status: "success",
            message: "successfully logged in"
        })
    } catch (error) {
        
    }
}

// user registration
const signup = async (req,  res) => {
    //const {name, email, password,image } = req.body;
    try {

        const extension = req.file.mimetype.split("/")[1];
        if (extension == "png" || extension == "jpg" || extension == "jpeg") {
            const fileName = req.file.filename + "." + extension;
            req.body.image=fileName;
            console.log(fileName)

            fs.rename(req.file.path, `uploads/${fileName}`, () => {
                console.log("\nFile Renamed!\n");
            })
            //  res.json({
            //     message: "uploaded"
            // })
        }
        else {

            fs.unlink(req.file.path, () => console.log("file deleted"))
             res.json({
                message: "only images are accepted"
            })
        }

       
        const {name, email, password, image } = req.body;
        // check is user already registered 
        const alreadyUser = await UserModel.findOne({ email: email});
        if(alreadyUser !== null) {
            return res.status(200).json({
                status: "failed",
                message: "Email already registered"
            });
        }

        // password hashed
        const hashed = await bcrypt.hash(password, 10);

        // create user
        const newUser = await UserModel.create({
            name: name, email: email, password: hashed, image: image
        })

        // generate token?
        const token = jwt.sign( {id: newUser._id}, secretKey );

        // return response
        res.status(201).json({
            status: "success",
            message: "Registered successfully",
            token: token
        })

    } catch (error) {
        
    }
}


module.exports = {
    login,
    signup
}