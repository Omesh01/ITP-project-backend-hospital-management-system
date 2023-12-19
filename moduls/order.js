const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    company_name:{
        type:String,
        required: true
        
    },
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    model_number:{
        type:String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
},{timestamps:true})


module.exports = mongoose.model("order",OrderSchema);
