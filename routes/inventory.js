const express = require('express');
const { AddInventory, UpdateInventory, DeleteInventory, GetOneInventory, GetInventory } = require('../controllers/inventory');
const router = express.Router();




router.post('/add',AddInventory);
router.delete('/delete/:id',DeleteInventory);
router.put('/update/:id',UpdateInventory);
router.get("/get", GetInventory);
router.get("/get/:id", GetOneInventory);

module.exports = router;