var mongoose=require("mongoose");

var commentscheema=new mongoose.Schema({
   
    comment:{
        type: String,
        required: [true, "Comment is required"]
    },
    postid:{
        type: String,
        required: [true, "Post id  is required"]
    }
    
},{ timestamps: true });


const CommentModel= mongoose.model('comment',commentscheema);

module.exports=CommentModel;