const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

    user_id : {
        type: String,
        required: true
    },
    attendance : {
        type: String
    },
    inTime : {
        type: String
    },
    outTime : {
        type: String
    },
    details : {
        type: String
    },
    total_hours: {
        type: String
    },
    salary : {
        type: Number
    }

})

const Attendace = mongoose.model("attendance",attendanceSchema);
module.exports = Attendace;