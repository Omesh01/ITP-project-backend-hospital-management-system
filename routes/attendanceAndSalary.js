const express = require('express');
const { AddAttendance, UpdateAttendance, DeleteAttendance, GetOneAttendance, GetAttendance } = require('../controllers/attendanceAndSalary');
const router = express.Router();




router.post('/add',AddAttendance);
router.delete('/delete/:id',DeleteAttendance);
router.put('/update/:id',UpdateAttendance);
router.get("/get", GetAttendance);
router.get("/get/:id", GetOneAttendance);

module.exports = router;