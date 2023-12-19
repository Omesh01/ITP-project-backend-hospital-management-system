const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InventorySchema = new Schema({

    inventory_id:{
        type:String,
        required: true
        
    },
    inventory_type:{
        type: String,
        required: true
    },
    item_name:{
        type:String,
        required: true 
    },
    location:{
        type:String,
        required: true
    },
    update_date:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    }
},{timestamps:true})



module.exports = mongoose.model("inventory",InventorySchema);
