const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const Hospital = Schema({
    hospitalName:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    availableBeds:{
        type:String,
        required:true
    },
    noOfDoctor:{
        type:String,
        required:true
    },
    noOfBeds:{
        type:String,
        required:true
    },
    availableDoctor:{
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