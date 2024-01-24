const  express =  require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const PostCtrl=require("../controler/PostControler");

router.post("/create", upload.single('image'), PostCtrl.create);
router.get("/getall",   PostCtrl.getall);
router.get("/getsingle/:id",   PostCtrl.getsingle);
router.delete("/delete/:id",PostCtrl.deletePost);
router.put("/update/:id",upload.single('image'),PostCtrl.update);


module.exports=router;