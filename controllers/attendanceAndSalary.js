const router = require("express").Router();
let Attendance = require("../moduls/attendanceAndSalary");

exports.AddAttendance = ((req,res) => {
    const user_id = req.body.user_id;
    const attendance = req.body.attendance;
    const inTime = req.body.inTime;
    const outTime = req.body.outTime;
    const details = req.body.details;
    const total_hours = req.body.total_hours;
    const salary = req.body.salary;

    const newAttendace = new Attendance({
        user_id,
        attendance,
        inTime,
        outTime,
        details,
        total_hours,
        salary
    })

    newAttendace.save().then(()=>{
        res.json("Attednace Added")
    }).catch((err) => {
        console.log(err);
    })

})

exports.UpdateAttendance = (async(req,res)=>{
    let userId = req.params.id;
    const {user_id, attendance, inTime, outTime, details, total_hours, salary} = req.body;

    const updateAttendace = {
        user_id, 
        attendance, 
        inTime, 
        outTime, 
        details, 
        total_hours, 
        salary
    }

    const update = await Attendance.findByIdAndUpdate(userId, updateAttendace).then(() => {
        res.status(200).send({status: "Attendace Updated"})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updation data"});
    })

    
})

exports.DeleteAttendance = (async (req,res) =>{
     let userId = req.params.id;

     await Attendance.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Attedance deleted"});
     }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
     })
})

exports.GetOneAttendance = (async (req,res) => {
    let userId = req.params.id;
    
    const user = await Attendance.findById(userId)
    .then((use) => {
        res.json(use);
    })
    .catch((err) => {
        res.status(500).send({status: "Error with finding data", error: err.message});
    });
})

exports.GetAttendance = ((req,res) =>{
    Attendance.find().then((user)=>{
        res.json(user)
    }).catch((err) =>{
        console.log(err)
    })
})
