const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const { response } = require('express');

const StaffSchema = new Schema({

    email:{
        type:String,
        required: true
        
    },
    Hash_password:{
        type:String,
        required: true
    }
},{timestamps:true})


StaffSchema.virtual('password').set(function(Password){
    this.Hash_password =bcrypt.hashSync(Password, 8)
});

StaffSchema.methods ={
    authenticate: function(){
        return bcrypt.compareSync(password , this.Hash_password);
    }
}

module.exports = mongoose.model("staff",StaffSchema);
