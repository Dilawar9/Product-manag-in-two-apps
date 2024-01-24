const  express =  require("express");
const router = express.Router();
const UserController=require("../controler/UserControler")
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post("/login", UserController.login);
router.post("/signup",  upload.single('image'), UserController.signup);

module.exports = router;