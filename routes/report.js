const express = require('express');
const { addReport, updateReport,getAllReport, deleteReport, getOneReport } = require('../controllers/report');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'UploadImage/reports')
    },
    filename: function(req, file,cb){
        cb(null,Date.now() + '_' + file.originalname);
    }
})

const upload = multer({storage});


router.post('/add',upload.single('picture'),addReport);
router.delete('/delete/:id',deleteReport);
router.put('/update/:id',upload.single('picture'),updateReport);
router.get("/get", getAllReport);
router.get("/get/:id", getOneReport);

module.exports = router;