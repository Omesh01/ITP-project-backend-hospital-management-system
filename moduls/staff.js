const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


const UserSchema = new Schema({

    user_id:{
        type:String,
        required: true
        
    },
    name:{
        type: String,
        required: true
    },
    birthday:{
        type:String,
        required: true 
    },
    staff_no:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    Hash_password:{
        type:String,
        required: true
    },
    gender:{
        type:String,
        required: true
    },
    tel_no:{
        type:String,
        required: true
    },
    ProfilePicture:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})


module.exports = mongoose.model("users",UserSchema);
