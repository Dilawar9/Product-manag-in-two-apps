const  express =  require("express");
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const CategoryContorler=require("../controler/CategoryControler");


router.post("/creat",CategoryContorler.creat);
router.get("/getall",  CategoryContorler.getall);
// router.post("/catetory",CategoryContorler.mobileCategory);
// router.get("/getal",CategoryContorler.softwareCategory)

module.exports=router;