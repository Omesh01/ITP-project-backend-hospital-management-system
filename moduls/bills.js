const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BillSchema = new Schema({

    company_name:{
        type:String,
        required: true
        
    },
    amount:{
        type: String,
        required: true
    },
    billed_date:{
        type: String,
        required: true
    },
    cp_bill:{
        type:String
    }
},{timestamps:true})


module.exports = mongoose.model("bills",BillSchema);
