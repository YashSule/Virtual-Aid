const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const User = Schema({
    name:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("User",User)