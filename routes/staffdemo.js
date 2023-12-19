const express = require('express');
const { AddStaff,Signin,tokenRefresh} = require('../controllers/staffdemo');
const router = express.Router();



router.post('/add',AddStaff);
router.post('/Signin',Signin);
router.post('/Token',tokenRefresh);

module.exports = router;