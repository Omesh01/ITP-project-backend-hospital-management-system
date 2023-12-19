const express = require('express');
const { AddOrder} = require('../controllers/order');
const router = express.Router();



router.post('/add',AddOrder);

module.exports = router;