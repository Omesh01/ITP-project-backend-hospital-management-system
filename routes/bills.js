const express = require('express');
const { addBill} = require('../controllers/bills');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'UploadImage/bills')
    },
    filename: function(req, file,cb){
        cb(null,Date.now() + '_' + file.originalname);
    }
})

const upload = multer({storage});


router.post('/add',upload.single('cp_bill'),addBill);

module.exports = router;