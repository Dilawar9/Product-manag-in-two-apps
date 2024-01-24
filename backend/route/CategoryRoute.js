const  express =  require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const CategoryContorler=require("../controler/CategoryControler");


router.post("/create", upload.single('image'),CategoryContorler.creat);
router.get("/getall",  CategoryContorler.getall);


module.exports=router;