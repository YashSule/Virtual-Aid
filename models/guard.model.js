const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Guard = Schema({
    guardName:{
        type:String,
        require:true

    },
    guardAge:{
        type:String,
        required:true
    },
    guardContactNo:{
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
});

module.exports = mongoose.model("Guard",Guard)