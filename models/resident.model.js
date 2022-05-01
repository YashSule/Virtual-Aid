 const mongoose= require('mongoose');
 const Schema = mongoose.Schema;
 const Resident = Schema({
    residentName:{
        type: String,

    },
    flatNo: {
        type: String,
        unique: true,
    },
    wingNo: {
        type: String,
    },
    mobileNo: {
        type: String,
        unique: true,
    },
    guardName:{
        type:String,  
    },
    guardAge:{
        type:String,
    },
    userName: {
        type: String,
        required:true,
        unique: true,
    },
    password: {
        type: String,
        required:true,
        unique: true,
    },
    userRole: {
        type: String,
    }
 });

 module.exports = mongoose.model("Resident",Resident)