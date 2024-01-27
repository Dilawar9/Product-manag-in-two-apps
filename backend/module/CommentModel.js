const mongoose=require('mongoose')
const schema = new mongoose.Schema({
    postid:String,

    comment:String,
    status:{
        type:String,
        default:"pending",
        enum:['approved',"pending"]
    },
   

},{timestamps:true});


const CommentModle = mongoose.model('comment', schema);
module.exports=CommentModle;