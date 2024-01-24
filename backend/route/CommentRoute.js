const  express =  require("express");
const router = express.Router();

const CommentControler=require("../controler/CommentControler");

router.post("/create",CommentControler.create);
router.get("/getall",CommentControler.getall);
router.delete("/delete/:id",CommentControler.delet);
router.put("/update/:id",CommentControler.update);

module.exports=router;