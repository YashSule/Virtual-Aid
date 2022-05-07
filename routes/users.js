const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

router.route("/").post((req,res)=>{
    console.log("postUser method");
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        } else{
            const user = new User({
                name:req.body.name,
                mobileNo:req.body.mobileNo,
                userName:req.body.userName,
                password:hash
            });
            user
              .save()
              .then(()=>{
                  console.log("User Registered")
                  res.status(200).json("Okay")
              })
              .catch((err)=>{
                  console.log("postUser::error"+err);
                  res.status(403).json({
                      msg: err
                  })
                  .catch((err)=>{
                      res.status(403).json({msg: err});
                  });
              })
        }
    })
}),

router.route("/login").post((req,res,next)=>{
    console.log("Login::post");
    User.find({userName:req.body.userName})   
    .exec()
    .then(users=>{
        if(users.length<1){
            //if username does not found then array's length will be 0.
            return res.status(401).json({
                msg:"User doesn't exist.", 
            })
        }
        bcrypt.compare(req.body.password,users[0].password,(err,result)=>{
            if(!result){
                return res.status(401).json({
                    msg:"Password doesn't match"
                })
            }
            if(result){
                console.log("Login :: Post :: Result :: ",result);
                const token = jwt.sign({
                    userName:users[0].userName,
                    name:users[0].name,
                    mobileNo:users[0].mobileNo
                },
                'ddqqaayh.',
                {
                    expiresIn:"24h"
                }
                );
                res.status(200).json({
                    userName:users[0].userName,
                    name:users[0].name,
                    mobileNo:users[0].mobileNo,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            err:err
        })
    })
}),

router.patch('/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        user.password = req.body.password
        const a1 = await user.save()
        res.json(a1)
        console.log("Updated")
    } catch(err){
        res.status(400).json("Error : "+err)
    }
}),

router.get('/',async(req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.log("Error : "+err)
    } 

 })

module.exports = router