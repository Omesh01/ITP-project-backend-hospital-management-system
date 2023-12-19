const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ReportSchema = new Schema({

    report_id:{
        type:String,
        required: true
        
    },
    doctor_name:{
        type: String,
        required: true
    },
    illness:{
        type:String,
        required: true 
    },
    date:{
        type:String,
        required: true
    },
    picture:{
        type:String
    }
},{timestamps:true})



module.exports = mongoose.model("report",ReportSchema);
