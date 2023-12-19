const express = require('express');
const { UserRegister, Signin, Signout, tokenRefresh, getAllUsers,getOneUser } = require('../controllers/staff');
//const requireSignin = require('../middleware/auth.js')
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'UploadImage')
    },
    filename: function(req, file,cb){
        cb(null,file.originalname);
    }
})

const upload = multer({storage:storage});



router.post('/Signup',upload.single('ProfilePicture'), UserRegister);
router.post('/Signin',Signin);
router.delete('/Signout',Signout);
router.post('/Token',tokenRefresh);
router.get("/allusers", getAllUsers);
router.get("/user/:user_id", getOneUser);

module.exports = router;